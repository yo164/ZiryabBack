-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "ndSurname" TEXT,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "dni" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'STUDENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "ndSurname" TEXT,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "dni" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'TEACHER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "ndSurname" TEXT,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "dni" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "idCourse" INTEGER NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeacherOnSubject" (
    "idSubject" INTEGER NOT NULL,
    "idTeacher" INTEGER NOT NULL,

    CONSTRAINT "TeacherOnSubject_pkey" PRIMARY KEY ("idSubject","idTeacher")
);

-- CreateTable
CREATE TABLE "StudentOnSubjectonGroup" (
    "id" SERIAL NOT NULL,
    "idStudent" INTEGER NOT NULL,
    "idGroup" INTEGER NOT NULL,
    "idSubject" INTEGER NOT NULL,
    "schoolYear" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentOnSubjectonGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_dni_key" ON "Student"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_email_key" ON "Teacher"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_dni_key" ON "Teacher"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_dni_key" ON "Admin"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "StudentOnSubjectonGroup_idStudent_idGroup_idSubject_schoolY_key" ON "StudentOnSubjectonGroup"("idStudent", "idGroup", "idSubject", "schoolYear");

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_idCourse_fkey" FOREIGN KEY ("idCourse") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherOnSubject" ADD CONSTRAINT "TeacherOnSubject_idSubject_fkey" FOREIGN KEY ("idSubject") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherOnSubject" ADD CONSTRAINT "TeacherOnSubject_idTeacher_fkey" FOREIGN KEY ("idTeacher") REFERENCES "Teacher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentOnSubjectonGroup" ADD CONSTRAINT "StudentOnSubjectonGroup_idStudent_fkey" FOREIGN KEY ("idStudent") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentOnSubjectonGroup" ADD CONSTRAINT "StudentOnSubjectonGroup_idGroup_fkey" FOREIGN KEY ("idGroup") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentOnSubjectonGroup" ADD CONSTRAINT "StudentOnSubjectonGroup_idSubject_fkey" FOREIGN KEY ("idSubject") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
