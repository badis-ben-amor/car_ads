import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Car } from "./car.entity";
import { Repository } from "typeorm";
import { CloudinaryService } from "src/shared/cloudinary/cloudinary.service";
import { CreateCarDto } from "./dto/car-create.dto";
import { UserReqDto } from "src/shared/dto/userReq.dto";
import { UpdateCarDto } from "./dto/update-car.dto";

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async findAll(): Promise<Car[]> {
    return this.carRepository.find();
  }

  async findOne(id: number): Promise<Car> {
    const car = await this.carRepository.findOne({ where: { id } });
    if (!car) {
      throw new NotFoundException("Car not found");
    }
    return car;
  }

  async create(
    createCarDto: CreateCarDto,
    user: UserReqDto,
    file?: Express.Multer.File,
  ) {
    if (file) {
      const image_url = await this.cloudinaryService.uploadImage(
        file,
        "car_ads/car",
      );
      const newCar = this.carRepository.create({
        ...createCarDto,
        image_url: image_url || undefined,
        userId: user.id,
        // user: { id: user.id },
      });
      return this.carRepository.save(newCar);
    } else {
      const newCar = this.carRepository.create({
        ...createCarDto,
        // user: { id: user.id },
        userId: user.id,
      });
      return this.carRepository.save(newCar);
    }
  }

  async update(
    updateCarDto: UpdateCarDto,
    userId: number,
    carId: number,
    file?: Express.Multer.File,
  ) {
    const car = await this.carRepository.findOne({
      where: { id: carId, userId },
      // where: { id: carId, user: { id: userId } },
    });
    if (!car) throw new NotFoundException("Car not found");

    if (file) {
      if (car?.image_url) {
        const publicId = car.image_url.split("/").pop()?.split(".")[0];
        if (publicId) {
          this.cloudinaryService.deleteImage(publicId, "car_ads/car");
        }
      }
      const image_url = await this.cloudinaryService.uploadImage(
        file,
        "car_ads/car",
      );
      return this.carRepository.update(carId, { ...updateCarDto, image_url });
    }

    return this.carRepository.update(carId, { ...updateCarDto });
  }

  async delete(carId: number, userId: number) {
    const car = await this.carRepository.findOne({
      where: { id: carId, userId },
      // where: { id: carId, user: { id: userId } },
    });
    if (!car) throw new NotFoundException("Car not found");

    if (car?.image_url) {
      const publidId = car.image_url.split("/").pop()?.split(".")[0];
      if (publidId) {
        this.cloudinaryService.deleteImage(publidId, "car_ads/car");
      }
    }

    return this.carRepository.delete(carId);
  }
}
