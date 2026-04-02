-- CreateEnum
CREATE TYPE "JustificationStatus" AS ENUM ('PENDING', 'VIEWED', 'REJECTED');

-- AlterTable
ALTER TABLE "Assistance" ADD COLUMN     "justificationStatus" "JustificationStatus",
ADD COLUMN     "justificationUri" TEXT;

-- AlterTable
ALTER TABLE "SessionClass" ALTER COLUMN "date" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "attachmentUrl" TEXT;
