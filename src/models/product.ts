import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  location: string;

  @Column('text', { array: true })
  photos: string[];

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ name: 'bulk_price' })
  bulkPrice: number;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column()
  name: string;

  @Column()
  delivery: boolean;

  @Column('simple-array')
  payments: string[];
}
