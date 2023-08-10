import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  save() {
    throw new Error('Method not implemented.');
  }
  static find() {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  location: string;

  @Column('text', { array: true })
  images: string[]; // Modified to store photo file paths

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
