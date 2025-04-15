import { Module } from "@nestjs/common";
import { CarsService } from "./cars.service";
import { CarsController } from "./cars.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Car } from "./car.entity";
import { AuthModule } from "src/auth/auth.module";
import { CloudinayModule } from "src/shared/cloudinary/cloudinary.module";

@Module({
  imports: [TypeOrmModule.forFeature([Car]), AuthModule, CloudinayModule],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
