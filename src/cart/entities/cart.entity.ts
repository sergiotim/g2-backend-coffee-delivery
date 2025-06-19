import { Cart as PrismaCart } from '@prisma/client';

export class Cart implements PrismaCart {
  id: string;
  userId: string | null;
  dataTimeCompleted: Date;
  status: string;
  statusPayment: string;
  createdAt: Date;
  updatedAt: Date;
} 