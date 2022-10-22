import { Expose, Transform } from 'class-transformer';
//import { User } from '../../users/user.entity';

export class ReportDto {
  @Expose()
  id: number;

  @Expose()
  price: number;

  @Expose()
  year: number;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  mileage: number;

  @Expose()
  approved: boolean;

  // take original report entity and pull out user id, obj
  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
