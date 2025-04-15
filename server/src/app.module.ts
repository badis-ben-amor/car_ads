import { Module } from "@nestjs/common";
import { CarsModule } from "./cars/cars.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { UserModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import { MulterModule } from "@nestjs/platform-express";
import { CloudinayModule } from "./shared/cloudinary/cloudinary.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      ssl: { rejectedUnauthorized: true },
    }),
    JwtModule.register({ global: true }),
    MulterModule.register(),
    AuthModule,
    UserModule,
    CarsModule,
    CloudinayModule,
  ],
})
export class AppModule {}
