import { PartialType } from "@nestjs/mapped-types";
import { CreateCarDto } from "./car-create.dto";

export class UpdateCarDto extends PartialType(CreateCarDto) {}
