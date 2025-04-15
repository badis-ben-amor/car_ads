import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getProfile(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: ["id", "name", "isAdmin"],
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }
}
