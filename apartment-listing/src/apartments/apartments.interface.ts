import { Apartment } from './apartments.schema';

export interface PaginatedApartments {
  total: number;
  page: number;
  limit: number;
  apartments: Apartment[];
}
