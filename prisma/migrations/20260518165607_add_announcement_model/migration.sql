/*
  Warnings:

  - You are about to drop the column `action` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `body` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `entityId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `entityType` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `idStudent` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `idTeacher` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `scheduledFor` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `message` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipientFirebaseUID` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `Notification` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_idStudent_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_idTeacher_fkey";

-- DropIndex
DROP INDEX "Notification_createdAt_idx";

-- DropIndex
DROP INDEX "Notification_entityType_entityId_idx";

-- DropIndex
DROP INDEX "Notification_idStudent_isRead_idx";

-- DropIndex
DROP INDEX "Notification_idTeacher_isRead_idx";

-- DropIndex
DROP INDEX "Notification_scheduledFor_idx";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "action",
DROP COLUMN "body",
DROP COLUMN "entityId",
DROP COLUMN "entityType",
DROP COLUMN "idStudent",
DROP COLUMN "idTeacher",
DROP COLUMN "scheduledFor",
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "readAt" TIMESTAMP(3),
ADD COLUMN     "recipientFirebaseUID" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'INFO',
ALTER COLUMN "title" SET NOT NULL;

-- DropEnum
DROP TYPE "NotificationAction";

-- DropEnum
DROP TYPE "NotificationEntityType";

-- CreateTable
CREATE TABLE "Announcement" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUserId" INTEGER NOT NULL,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Notification_recipientFirebaseUID_isRead_createdAt_idx" ON "Notification"("recipientFirebaseUID", "isRead", "createdAt");
