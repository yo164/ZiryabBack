import request from 'supertest';
import app from '../app.js';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

const prisma = new PrismaClient();

describe('Announcements Endpoints (Integration)', () => {
  let teacherCookie: string;
  let studentCookie: string;
  let mockTeacherId: number;
  let mockStudentId: number;
  let createdAnnouncementId: number;

  const generateCookie = (payload: { sub: number; role: string; email: string; firebaseUID: string }) => {
    const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: '1h' });
    return `auth_token=${token}`;
  };

  beforeAll(async () => {
    // 1. Limpiar rastros si quedaron test users anteriores por error
    await prisma.teacher.deleteMany({ where: { email: 'teacher_ann_test@example.com' } });
    await prisma.student.deleteMany({ where: { email: 'student_ann_test@example.com' } });

    // 2. Crear profesor de prueba
    const teacher = await prisma.teacher.create({
      data: {
        email: 'teacher_ann_test@example.com',
        name: 'Profesor',
        surname: 'De Prueba',
        birthDate: new Date('1980-01-01'),
        dni: '98765432A',
        firebaseUID: 'uid_teacher_ann_test',
        role: 'TEACHER',
      },
    });
    mockTeacherId = teacher.id;

    // 3. Crear alumno de prueba
    const student = await prisma.student.create({
      data: {
        email: 'student_ann_test@example.com',
        name: 'Alumno',
        surname: 'De Prueba',
        birthDate: new Date('2005-01-01'),
        dni: '12345678B',
        firebaseUID: 'uid_student_ann_test',
        role: 'STUDENT',
      },
    });
    mockStudentId = student.id;

    // 4. Generar cookies
    teacherCookie = generateCookie({
      sub: teacher.id,
      role: 'TEACHER',
      email: teacher.email,
      firebaseUID: teacher.firebaseUID,
    });

    studentCookie = generateCookie({
      sub: student.id,
      role: 'STUDENT',
      email: student.email,
      firebaseUID: student.firebaseUID,
    });
  });

  afterAll(async () => {
    // Limpiar base de datos
    if (createdAnnouncementId) {
      await prisma.announcement.delete({ where: { id: createdAnnouncementId } }).catch(() => {});
    }
    if (mockTeacherId) {
      await prisma.teacher.delete({ where: { id: mockTeacherId } }).catch(() => {});
    }
    if (mockStudentId) {
      await prisma.student.delete({ where: { id: mockStudentId } }).catch(() => {});
    }
    await prisma.$disconnect();
  });

  describe('POST /api/announcements', () => {
    it('debe denegar la creación si no está autenticado', async () => {
      const res = await request(app)
        .post('/api/announcements')
        .send({ title: 'Prueba', body: 'Contenido' });

      expect(res.status).toBe(401);
      expect(res.body.message).toBeDefined();
    });

    it('debe denegar la creación a un alumno (STUDENT)', async () => {
      const res = await request(app)
        .post('/api/announcements')
        .set('Cookie', [studentCookie])
        .send({ title: 'Prueba Alumno', body: 'Contenido Alumno' });

      expect(res.status).toBe(403);
    });

    it('debe fallar si faltan campos obligatorios (Zod)', async () => {
      const res = await request(app)
        .post('/api/announcements')
        .set('Cookie', [teacherCookie])
        .send({ title: '' }); // cuerpo ausente y titulo vacio

      expect(res.status).toBe(400);
      expect(res.body.errors).toBeDefined();
    });

    it('debe permitir crear un anuncio a un profesor (TEACHER) de forma exitosa', async () => {
      const res = await request(app)
        .post('/api/announcements')
        .set('Cookie', [teacherCookie])
        .send({
          title: 'Concierto de Primavera',
          body: 'El concierto se celebrará en el auditorio a las 18:00.',
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeDefined();
      expect(res.body.data.title).toBe('Concierto de Primavera');
      expect(res.body.data.body).toBe('El concierto se celebrará en el auditorio a las 18:00.');
      expect(res.body.data.createdByUserId).toBe(mockTeacherId);

      createdAnnouncementId = res.body.data.id;
    });
  });

  describe('GET /api/announcements', () => {
    it('debe denegar el acceso si no está autenticado', async () => {
      const res = await request(app).get('/api/announcements');
      expect(res.status).toBe(401);
    });

    it('debe permitir obtener todos los anuncios a un alumno (STUDENT) e incluir datos del creador', async () => {
      const res = await request(app)
        .get('/api/announcements')
        .set('Cookie', [studentCookie]);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(1);

      const target = res.body.data.find((a: any) => a.id === createdAnnouncementId);
      expect(target).toBeDefined();
      expect(target.title).toBe('Concierto de Primavera');
      expect(target.creator).toBeDefined();
      expect(target.creator.name).toBe('Profesor');
      expect(target.creator.email).toBe('teacher_ann_test@example.com');
    });

    it('debe permitir obtener todos los anuncios a un profesor (TEACHER)', async () => {
      const res = await request(app)
        .get('/api/announcements')
        .set('Cookie', [teacherCookie]);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });
});
