import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { v2 as cloudinary } from "cloudinary";

@Injectable()
export class CloudinaryProvider {
  private readonly cloudinaryInstance: typeof cloudinary;

  constructor(private readonly configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get("CLOUDINARY_NAME"),
      api_key: this.configService.get("CLOUDINARY_API_KEY"),
      api_secret: this.configService.get("CLOUDINARY_API_SECRET"),
    });
    this.cloudinaryInstance = cloudinary;
  }
  getCloudinaryInstance() {
    return this.cloudinaryInstance;
  }
}
