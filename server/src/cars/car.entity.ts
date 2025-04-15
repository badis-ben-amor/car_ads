import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId: number;
  // @ManyToOne(() => User)
  // user: User;

  @Column({ nullable: true })
  image_url: string;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  contactNumber: string;
}
