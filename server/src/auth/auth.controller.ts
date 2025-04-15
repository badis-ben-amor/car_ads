import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(
    @Body("name") name: string,
    @Body("email") email: string,
    @Body("password") password: string,
    @Res() res: Response,
  ) {
    return this.authService.register(name, email, password, res);
  }

  @Post("login")
  login(
    @Body("email") email: string,
    @Body("password") password: string,
    @Res() res: Response,
  ) {
    return this.authService.login(email, password, res);
  }

  @Post("refresh")
  refresh(@Req() req: Request, @Res() res: Response) {
    return this.authService.refresh(req, res);
  }

  @Post("logout")
  logout(@Res() res: Response) {
    return this.authService.logout(res);
  }
}
