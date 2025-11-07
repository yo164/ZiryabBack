-- CreateTable
CREATE TABLE "_UserSubject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_UserSubject_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserSubject_B_index" ON "_UserSubject"("B");

-- AddForeignKey
ALTER TABLE "_UserSubject" ADD CONSTRAINT "_UserSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSubject" ADD CONSTRAINT "_UserSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
