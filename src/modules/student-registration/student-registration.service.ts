import prisma from "../../config/prisma.js";

export const create = async (data: {
  idStudent: number;
  idGroup: number;
  idSubject: number;
  schoolYear: string;
}) => {

    
  return prisma.studentOnSubjectonGroup.create({
    data,
  });
};
