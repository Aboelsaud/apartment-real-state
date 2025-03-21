import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { ApartmentsRepository } from './apartments.repository';
import { Apartment } from './apartments.schema';
import { SearchApartmentDto } from './apartments.dto';
import { PaginatedApartments } from './apartments.interface';

@Injectable()
export class ApartmentsService {
  private readonly logger = new Logger(ApartmentsService.name);

  constructor(private readonly apartmentsRepository: ApartmentsRepository) {}

  async findAll(searchDto: SearchApartmentDto): Promise<PaginatedApartments> {
    this.logger.log(`.............. findAllServiceLayer ..............`);

    const { page, limit, ...filter } = searchDto;

    return await this.apartmentsRepository.findAll(
      filter,
      page as number,
      limit as number,
    );
  }

  async findOne(id: string): Promise<Apartment> {
    this.logger.log(`.............. findOneServiceLayer ..............`);

    return await this.apartmentsRepository.findOne(id);
  }

  async create(apartmentData: Partial<Apartment>): Promise<Apartment> {
    this.logger.log(`.............. createServiceLayer ..............`);

    try {
      return await this.apartmentsRepository.create(apartmentData);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Apartment name must be unique');
      }
      throw error;
    }
  }
}
