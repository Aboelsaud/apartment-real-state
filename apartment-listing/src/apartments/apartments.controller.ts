import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
  Query,
  Logger,
} from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { Apartment } from './apartments.schema';
import { CreateApartmentDto, SearchApartmentDto } from './apartments.dto';
import { PaginatedApartments } from './apartments.interface';
import {
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';

@ApiTags('Apartments')
@ApiExtraModels(SearchApartmentDto, Apartment)
@Controller('apartments')
export class ApartmentsController {
  private readonly logger = new Logger(ApartmentsController.name);

  constructor(private readonly apartmentsService: ApartmentsService) {}

  @Get()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @ApiOperation({ summary: 'Get a paginated list of apartments' })
  @ApiQuery({
    name: 'search',
    required: false,
    example: 'Luxury',
    description: 'Search by name, unitNo, or project',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    example: 0,
    description: 'Page index (starts from 0)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    example: 10,
    description: 'Number of items per page',
  })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of apartments',
    schema: {
      type: 'object',
      properties: {
        total: { type: 'number', example: 100 },
        page: { type: 'number', example: 0 },
        limit: { type: 'number', example: 10 },
        apartments: {
          type: 'array',
          items: { $ref: getSchemaPath(Apartment) },
        },
      },
    },
  })
  async findAll(
    @Query() query: SearchApartmentDto,
  ): Promise<PaginatedApartments> {
    this.logger.log(`.............. findAllControllerLayer ..............`);
    return await this.apartmentsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get apartment details by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'Apartment UUID',
  })
  @ApiResponse({
    status: 200,
    description: 'Details of the requested apartment',
    type: Apartment,
  })
  @ApiResponse({ status: 404, description: 'Apartment not found' })
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Apartment> {
    this.logger.log(`.............. findOneControllerLayer ..............`);
    return await this.apartmentsService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiOperation({ summary: 'Create a new apartment' })
  @ApiResponse({
    status: 201,
    description: 'Apartment created successfully',
    type: Apartment,
  })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  async create(
    @Body() createApartmentDto: CreateApartmentDto,
  ): Promise<Apartment> {
    this.logger.log(`.............. createControllerLayer ..............`);
    return await this.apartmentsService.create(createApartmentDto);
  }
}
