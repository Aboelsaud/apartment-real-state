import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Apartment } from './apartments.schema';
import { PaginatedApartments } from './apartments.interface';

@Injectable()
export class ApartmentsRepository {
  private readonly logger = new Logger(ApartmentsRepository.name);

  constructor(
    @InjectModel(Apartment.name) private apartmentModel: Model<Apartment>,
  ) {}

  async findAll(
    filter: {
      name?: string;
      unitNo?: string;
      project?: string;
    },
    page: number,
    limit: number,
  ): Promise<PaginatedApartments> {
    this.logger.log(`.............. findAllRepositoryLayer ..............`);

    const query: any = {};

    if (filter.name) {
      query.name = { $regex: filter.name, $options: 'i' };
    }
    if (filter.unitNo) {
      query.unitNo = { $regex: filter.unitNo, $options: 'i' };
    }
    if (filter.project) {
      query.project = { $regex: filter.project, $options: 'i' };
    }

    const total = await this.apartmentModel.countDocuments(query);
    const apartments = await this.apartmentModel
      .find(query, { _id: 0 })
      .skip(page * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .lean();

    return { total, page, limit, apartments };
  }

  async findOne(apartmentId: string): Promise<Apartment> {
    this.logger.log(`.............. findOneRepositoryLayer ..............`);

    const apartment = await this.apartmentModel
      .findOne({ apartmentId }, { _id: 0 })
      .lean();
    if (!apartment) {
      throw new NotFoundException(`Apartment with ID ${apartmentId} not found`);
    }
    return apartment;
  }

  async create(apartmentData: Partial<Apartment>): Promise<Apartment> {
    this.logger.log(`.............. createRepositoryLayer ..............`);

    return await new this.apartmentModel(apartmentData).save();
  }
}
