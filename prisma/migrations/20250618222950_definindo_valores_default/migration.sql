-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "status" SET DEFAULT 'Aguardando Pagamento',
ALTER COLUMN "statusPayment" SET DEFAULT 'Pendente',
ALTER COLUMN "dataTimeCompleted" DROP NOT NULL;
