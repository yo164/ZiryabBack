-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserOnSubject" (
    "idUser" INTEGER NOT NULL,
    "idSubject" INTEGER NOT NULL,

    CONSTRAINT "UserOnSubject_pkey" PRIMARY KEY ("idUser","idSubject")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subject_name_key" ON "Subject"("name");

-- AddForeignKey
ALTER TABLE "UserOnSubject" ADD CONSTRAINT "UserOnSubject_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnSubject" ADD CONSTRAINT "UserOnSubject_idSubject_fkey" FOREIGN KEY ("idSubject") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
