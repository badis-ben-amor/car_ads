import { Injectable } from "@nestjs/common";
import { CloudinaryProvider } from "./cloudinary.provider";
import * as streamifier from "streamifier";

@Injectable()
export class CloudinaryService {
  constructor(private readonly cloudinaryProvider: CloudinaryProvider) {}

  async uploadImage(
    file: Express.Multer.File,
    folder: string,
  ): Promise<string | undefined> {
    const cloudinaryInstance = this.cloudinaryProvider.getCloudinaryInstance();

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinaryInstance.uploader.upload_stream(
        { resource_type: "auto", folder },
        (error, result) => {
          if (error) return reject(error);
          resolve(result?.secure_url);
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async deleteImage(publicId: string, folder: string): Promise<void> {
    const cloudinaryInstance = this.cloudinaryProvider.getCloudinaryInstance();

    return new Promise((resolve, reject) => {
      cloudinaryInstance.uploader.destroy(
        `${folder}/${publicId}`,
        { invalidate: true },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
    });
  }
}
