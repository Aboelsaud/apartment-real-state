import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApartmentsService } from './apartments.service';
import { ApartmentsController } from './apartments.controller';
import { Apartment, ApartmentSchema } from './apartments.schema';
import { ApartmentsRepository } from './apartments.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Apartment.name, schema: ApartmentSchema },
    ]),
  ],
  controllers: [ApartmentsController],
  providers: [ApartmentsService, ApartmentsRepository],
})
export class ApartmentsModule {}
