import prisma from "../../config/prisma.js";


export const create = async (data: { 
  registrations: { 
    idStudent: number, 
    idGroup: number, 
    idSubject: number, 
    schoolYear: string 
  }[]
}) => {
  const results = [];

  for (const reg of data.registrations) { 
    try {
      const created = await prisma.studentOnSubjectonGroup.create({ 
        data: {  //  Especifica cada campo
          idStudent: reg.idStudent,
          idGroup: reg.idGroup,
          idSubject: reg.idSubject,
          schoolYear: reg.schoolYear
        }
      });
   
      results.push(created);
    } catch (error: any) {
      
      throw error;
    }
  }


  
  return results;
};
// Service
/*export const create = async (data: { registrations: { idStudent: number, idGroup: number, idSubject: number, schoolYear: string }[]}) => {
  const results = [];

  for (const reg of data.registrations) {
    const created = await prisma.studentOnSubjectOnGroup.create({ data: reg });
    results.push(created);
  }

  return results;
};
*/