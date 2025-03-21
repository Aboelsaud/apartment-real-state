import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
  IsInt,
  MaxLength,
} from 'class-validator';

export class CreateApartmentDto {
  @ApiProperty({
    example: 'Luxury Apartment',
    description: 'Name of the apartment',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @ApiProperty({
    example: 'A beautiful sea-view apartment.',
    description: 'Description of the apartment',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  description: string;

  @ApiProperty({ example: 500000, description: 'Price of the apartment' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 'A101', description: 'Unit number of the apartment' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  unitNo: string;

  @ApiProperty({
    example: 'Skyline Towers',
    description: 'Project name the apartment belongs to',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  project: string;
}

export class SearchApartmentDto {
  @ApiPropertyOptional({
    example: 'Luxury',
    description: 'Search by apartment name',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'A101',
    description: 'Search by unit number',
  })
  @IsOptional()
  @IsString()
  unitNo?: string;

  @ApiPropertyOptional({
    example: 'Skyline Towers',
    description: 'Search by project name',
  })
  @IsOptional()
  @IsString()
  project?: string;

  @ApiPropertyOptional({
    example: 0,
    description: 'Page index (starts from 0)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  page?: number = 0;

  @ApiPropertyOptional({
    example: 10,
    description: 'Number of results per page',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}
