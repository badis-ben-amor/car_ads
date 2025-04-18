import {
  BadRequestException,
  Injectable,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcryptjs";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/user.entity";
import { Repository } from "typeorm";
import { Request, Response } from "express";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepositoty: Repository<User>,
    private readonly JwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(
    name: string,
    email: string,
    password: string,
    res: Response,
  ): Promise<Response> {
    const user = await this.userRepositoty.findOne({
      where: { email },
    });
    if (user) {
      throw new BadRequestException("User already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepositoty.create({
      name,
      email,
      password: hashedPassword,
    });
    await this.userRepositoty.save(newUser);

    const accessToken = this.JwtService.sign(
      {
        id: newUser.id,
        isAdmin: newUser.isAdmin,
      },
      {
        secret: this.configService.get("ACCESS_TOKEN_KEY"),
        expiresIn: this.configService.get("ACCESS_TOKEN_EXPIRES_IN"),
      },
    );
    const refreshToken = this.JwtService.sign(
      {
        id: newUser.id,
        isAdmin: newUser.isAdmin,
      },
      {
        secret: this.configService.get("REFRESH_TOKEN_KEY"),
        expiresIn: this.configService.get("REFRESH_TOKEN_EXPIRES_IN"),
      },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: this.configService.get("NODE_ENV") === "production",
      sameSite: this.configService.get("SAME_SITE"),
      maxAge: 33 * 24 * 60 * 60 * 1000,
    });

    return res.status(HttpStatus.CREATED).json({ accessToken });
  }

  async login(
    email: string,
    password: string,
    res: Response,
  ): Promise<Response> {
    const user = await this.userRepositoty.findOne({
      where: { email },
    });
    if (!user) throw new NotFoundException("User not found");

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword)
      throw new UnauthorizedException("Invalid credentials");

    const accessToken = this.JwtService.sign(
      { id: user.id, isAdmin: user.isAdmin },
      {
        secret: this.configService.get("ACCESS_TOKEN_KEY"),
        expiresIn: this.configService.get("ACCESS_TOKEN_EXPIRES_IN"),
      },
    );
    const refreshToken = this.JwtService.sign(
      { id: user.id, isAdmin: user.isAdmin },
      {
        secret: this.configService.get("REFRESH_TOKEN_KEY"),
        expiresIn: this.configService.get("REFRESH_TOKEN_EXPIRES_IN"),
      },
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: this.configService.get("NODE_ENV") === "production",
      sameSite: this.configService.get("SAME_SITE"),
    });

    return res.status(HttpStatus.OK).json({ accessToken });
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) throw new BadRequestException("not token provided");
    try {
      const payload = this.JwtService.verify(refreshToken, {
        secret: this.configService.get("REFRESH_TOKEN_KEY"),
      });

      const newAccessToken = this.JwtService.sign(
        { id: payload.id, isAdmin: payload.isAdmin },
        {
          secret: this.configService.get("ACCESS_TOKEN_KEY"),
          expiresIn: this.configService.get("ACCESS_TOKEN_EXPIRES_IN"),
        },
      );

      return res.status(HttpStatus.OK).json({ newAccessToken });
    } catch (error) {
      throw new InternalServerErrorException("Invalid Token");
    }
  }

  async logout(res: Response) {
    try {
      res.clearCookie("refreshToken");

      return res
        .status(HttpStatus.OK)
        .json({ message: "Logged out successfullt" });
    } catch (error) {
      throw new InternalServerErrorException("Logged out failed");
    }
  }
}
