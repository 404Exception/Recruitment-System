import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class candidates {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  contactnumber: string;
  
  @Column()
  first_name: string;
  
  @Column()
  last_name: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  summary: string;

  @Column()
  workexpyr: number;
}