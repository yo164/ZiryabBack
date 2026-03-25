/*
  Warnings:

  - The values [MISSING,LAG,JUSTIFY] on the enum `AssistanceStatus` will be removed. If these variants are still used in the database, this will fail.
  - The `status` column on the `SessionClass` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[idSchedule,date]` on the table `SessionClass` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `weekDay` on the `WeekSchedule` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('SCHEDULED', 'COMPLETED', 'CANCELLED');

-- AlterEnum
BEGIN;
CREATE TYPE "AssistanceStatus_new" AS ENUM ('PRESENT', 'ABSENT', 'LATE', 'EXCUSED');
ALTER TABLE "Assistance" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Assistance" ALTER COLUMN "status" TYPE "AssistanceStatus_new" USING (
  CASE 
    WHEN "status"::text = 'MISSING' THEN 'ABSENT'::"AssistanceStatus_new"
    WHEN "status"::text = 'LAG' THEN 'LATE'::"AssistanceStatus_new"
    WHEN "status"::text = 'JUSTIFY' THEN 'EXCUSED'::"AssistanceStatus_new"
    ELSE "status"::text::"AssistanceStatus_new"
  END
);
ALTER TYPE "AssistanceStatus" RENAME TO "AssistanceStatus_old";
ALTER TYPE "AssistanceStatus_new" RENAME TO "AssistanceStatus";
DROP TYPE "AssistanceStatus_old";
ALTER TABLE "Assistance" ALTER COLUMN "status" SET DEFAULT 'PRESENT';
COMMIT;

-- AlterTable
ALTER TABLE "SessionClass" ADD COLUMN "status_new" "SessionStatus" NOT NULL DEFAULT 'SCHEDULED';
UPDATE "SessionClass" SET "status_new" = 
  CASE "status"::text
    WHEN 'PROGRAMADA' THEN 'SCHEDULED'::"SessionStatus"
    WHEN 'REALIZADA' THEN 'COMPLETED'::"SessionStatus"
    WHEN 'CANCELADA' THEN 'CANCELLED'::"SessionStatus"
    ELSE 'SCHEDULED'::"SessionStatus"
  END;
ALTER TABLE "SessionClass" DROP COLUMN "status";
ALTER TABLE "SessionClass" RENAME COLUMN "status_new" TO "status";

-- AlterTable
ALTER TABLE "WeekSchedule" ADD COLUMN "weekDay_new" "DayOfWeek";
UPDATE "WeekSchedule" SET "weekDay_new" = (
  CASE "weekDay"
    WHEN 1 THEN 'MONDAY'::"DayOfWeek"
    WHEN 2 THEN 'TUESDAY'::"DayOfWeek"
    WHEN 3 THEN 'WEDNESDAY'::"DayOfWeek"
    WHEN 4 THEN 'THURSDAY'::"DayOfWeek"
    WHEN 5 THEN 'FRIDAY'::"DayOfWeek"
    WHEN 6 THEN 'SATURDAY'::"DayOfWeek"
    WHEN 7 THEN 'SUNDAY'::"DayOfWeek"
    ELSE 'MONDAY'::"DayOfWeek"
  END
);
ALTER TABLE "WeekSchedule" DROP COLUMN "weekDay";
ALTER TABLE "WeekSchedule" RENAME COLUMN "weekDay_new" TO "weekDay";
ALTER TABLE "WeekSchedule" ALTER COLUMN "weekDay" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SessionClass_idSchedule_date_key" ON "SessionClass"("idSchedule", "date");

-- CreateIndex
CREATE INDEX "WeekSchedule_idTeacherAssignment_weekDay_idx" ON "WeekSchedule"("idTeacherAssignment", "weekDay");
