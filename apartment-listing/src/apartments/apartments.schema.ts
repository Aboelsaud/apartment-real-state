import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({ timestamps: true })
export class Apartment extends Document {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Unique identifier for the apartment',
  })
  @Prop({ default: uuidv4 })
  apartmentId: string;

  @ApiProperty({
    example: 'Luxury Apartment',
    description: 'The name of the apartment',
  })
  @Prop({ required: true, unique: true, index: true })
  name: string;

  @ApiProperty({
    example: 'A beautiful sea-view apartment.',
    description: 'A detailed description of the apartment',
  })
  @Prop({ required: true })
  description: string;

  @ApiProperty({
    example: 500000,
    description: 'Price of the apartment in USD',
  })
  @Prop({ required: true })
  price: number;

  @ApiProperty({
    example: 'A101',
    description: 'Unit number of the apartment',
  })
  @Prop({ required: true, index: true })
  unitNo: string;

  @ApiProperty({
    example: 'Skyline Towers',
    description: 'Project name the apartment belongs to',
  })
  @Prop({ required: true, index: true })
  project: string;

  @ApiProperty({
    example: '2025-03-21T00:00:00Z',
    description: 'The date the apartment was created',
  })
  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ApartmentSchema = SchemaFactory.createForClass(Apartment);

ApartmentSchema.index({ name: 1, unitNo: 1, project: 1 });
