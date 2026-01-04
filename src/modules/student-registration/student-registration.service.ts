import prisma from "../../config/prisma.js";

// Service
export const create = async (data: { registrations: { idStudent: number, idGroup: number, idSubject: number, schoolYear: string }[]}) => {
  const results = [];

  for (const reg of data.registrations) {
    const created = await prisma.studentOnSubjectonGroup.create({ data: reg });
    results.push(created);
  }

  return results;
};
