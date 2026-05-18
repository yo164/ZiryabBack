import prisma from '../../config/prisma.js';

export interface CreateAnnouncementParams {
  title: string;
  body: string;
  createdByUserId: number;
}

export interface CreatorDetails {
  id: number;
  name: string;
  surname: string;
  email: string;
}

export interface AnnouncementWithCreator {
  id: number;
  title: string;
  body: string;
  createdAt: Date;
  createdByUserId: number;
  creator: CreatorDetails | null;
}

/**
 * Crea un nuevo anuncio
 */
export const create = async (params: CreateAnnouncementParams) => {
  return prisma.announcement.create({
    data: {
      title: params.title,
      body: params.body,
      createdByUserId: params.createdByUserId,
    },
  });
};

/**
 * Obtiene todos los anuncios ordenados por fecha de creación desc
 * E incluye los datos del profesor creador realizando un mapeo en memoria
 */
export const findAll = async (): Promise<AnnouncementWithCreator[]> => {
  const announcements = await prisma.announcement.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (announcements.length === 0) {
    return [];
  }

  // Obtener todos los IDs de creadores (profesores) únicos
  const teacherIds = [...new Set(announcements.map((a) => a.createdByUserId))];

  // Buscar los profesores en la base de datos
  const teachers = await prisma.teacher.findMany({
    where: {
      id: { in: teacherIds },
    },
    select: {
      id: true,
      name: true,
      surname: true,
      email: true,
    },
  });

  // Mapear los profesores a un diccionario/mapa por ID
  const teacherMap = new Map<number, CreatorDetails>();
  teachers.forEach((t) => {
    teacherMap.set(t.id, t);
  });

  // Retornar los anuncios con el objeto "creator" poblado
  return announcements.map((a) => ({
    id: a.id,
    title: a.title,
    body: a.body,
    createdAt: a.createdAt,
    createdByUserId: a.createdByUserId,
    creator: teacherMap.get(a.createdByUserId) || null,
  }));
};
