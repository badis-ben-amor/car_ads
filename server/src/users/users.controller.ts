import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "src/guards/auth.guard";

@UseGuards(AuthGuard)
@Controller("user")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getProfile(@Req() req: { user: { id: number } }) {
    return this.userService.getProfile(req.user.id);
  }
}
