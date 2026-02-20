-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('PRACTICE', 'THEORY', 'EXAM', 'PROJECT', 'HOMEWORK');

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('PENDING', 'SUBMITTED', 'LATE', 'GRADED', 'NOT_SUBMITTED');

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "idTeacherAssignment" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "TaskType" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "schoolYear" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentTask" (
    "id" SERIAL NOT NULL,
    "idTask" INTEGER NOT NULL,
    "idStudentEnrollment" INTEGER NOT NULL,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'PENDING',
    "submissionDate" TIMESTAMP(3),
    "score" DECIMAL(65,30),
    "feedback" TEXT,
    "attachmentUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentTask_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Task_idTeacherAssignment_schoolYear_idx" ON "Task"("idTeacherAssignment", "schoolYear");

-- CreateIndex
CREATE INDEX "Task_dueDate_idx" ON "Task"("dueDate");

-- CreateIndex
CREATE INDEX "StudentTask_idStudentEnrollment_status_idx" ON "StudentTask"("idStudentEnrollment", "status");

-- CreateIndex
CREATE INDEX "StudentTask_idTask_status_idx" ON "StudentTask"("idTask", "status");

-- CreateIndex
CREATE UNIQUE INDEX "StudentTask_idTask_idStudentEnrollment_key" ON "StudentTask"("idTask", "idStudentEnrollment");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_idTeacherAssignment_fkey" FOREIGN KEY ("idTeacherAssignment") REFERENCES "TeacherOnSubjectOnGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentTask" ADD CONSTRAINT "StudentTask_idTask_fkey" FOREIGN KEY ("idTask") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentTask" ADD CONSTRAINT "StudentTask_idStudentEnrollment_fkey" FOREIGN KEY ("idStudentEnrollment") REFERENCES "StudentOnSubjectOnGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
