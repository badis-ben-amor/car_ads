import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { CarsService } from "./cars.service";
import {} from "@nestjs/common";
import { Car } from "./car.entity";
import { AuthGuard } from "src/guards/auth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateCarDto } from "./dto/car-create.dto";
import { ReqDto } from "src/shared/dto/req.dto";
import { UpdateCarDto } from "./dto/update-car.dto";

@Controller("car")
export class CarsController {
  constructor(private readonly carService: CarsService) {}

  @Get()
  getAll(): Promise<Car[]> {
    return this.carService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number): Promise<Car> {
    return this.carService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor("image_url"))
  create(
    @Body() createCarDto: CreateCarDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: ReqDto,
  ): Promise<Car> {
    return this.carService.create(createCarDto, req.user, file);
  }

  @UseGuards(AuthGuard)
  @Patch(":carId")
  @UseInterceptors(FileInterceptor("image_url"))
  update(
    @Param("carId") carId: number,
    @Body() updateCarDto: UpdateCarDto,
    @Req() req: ReqDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.carService.update(updateCarDto, req.user.id, carId, file);
  }

  @UseGuards(AuthGuard)
  @Delete(":carId")
  delete(@Param("carId") cardId: number, @Req() req: ReqDto) {
    return this.carService.delete(cardId, req.user.id);
  }
}
