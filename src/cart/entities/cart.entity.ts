import { Cart as PrismaCart } from '@prisma/client';

export class Cart implements PrismaCart {
  id: string;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
} 