/*
  Warnings:

  - You are about to drop the column `idCourse` on the `Group` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Group_name_idCourse_key";

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "idCourse";
