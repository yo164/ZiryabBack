/*
  Warnings:

  - A unique constraint covering the columns `[firebaseUID]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[firebaseUID]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[firebaseUID]` on the table `Teacher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firebaseUID` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firebaseUID` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firebaseUID` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "firebaseUID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "firebaseUID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "firebaseUID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_firebaseUID_key" ON "Admin"("firebaseUID");

-- CreateIndex
CREATE UNIQUE INDEX "Student_firebaseUID_key" ON "Student"("firebaseUID");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_firebaseUID_key" ON "Teacher"("firebaseUID");
