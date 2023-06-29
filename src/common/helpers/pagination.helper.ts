import { Injectable } from '@nestjs/common';
import { PaginationDto } from '../dto';

@Injectable()
export class PaginationHelper {
  sanitizePaginationParams(pagination: PaginationDto): PaginationDto {
    const sanitizedPagination = { ...pagination };
    sanitizedPagination.page = sanitizedPagination.page || 1;
    sanitizedPagination.limit = Math.min(sanitizedPagination.limit || 10, 100);
    return sanitizedPagination;
  }

  calculateSkip(pagination: PaginationDto): number {
    return (pagination.page - 1) * pagination.limit;
  }

  calculateTake(pagination: PaginationDto): number {
    return pagination.limit;
  }
}
