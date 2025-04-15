import { IsNotEmpty } from "class-validator";

export class CreateCarDto {
  @IsNotEmpty()
  make: string;

  @IsNotEmpty()
  model: string;

  @IsNotEmpty()
  year: number;

  @IsNotEmpty()
  price: number;

  description: string;

  @IsNotEmpty()
  contactNumber: string;
}
