import { Injectable } from '@nestjs/common';

@Injectable()
export class EnumsService {
  enums = {
    IngredientUnit: {
      kg: 'KG',
      l: 'K',
      count: 'COUNT',
    },
    Roles: {
      client: 'CLIENT',
      admin: 'ADMIN',
    },
    OrderStatuses: {
      pending: 'PENDING',
      processing: 'PROCESSING',
      readyForPickup: 'READY_FOR_PICKUP',
      inDelivery: 'IN_DELIVERY',
      delivered: 'DELIVERED',
      cancelled: 'CANCELLED',
      refunded: 'REFUNDED',
      completed: 'COMPLETED',
      onhold: 'ONHOLD',
      inProgress: 'IN_PROGRESS',
    },
  };

  async getAll() {
    return JSON.stringify(this.enums)
  }
}
