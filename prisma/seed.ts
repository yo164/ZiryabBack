import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // Limpiar datos existentes
  await prisma.studentOnSubjectonGroup.deleteMany();
  await prisma.teacherOnSubject.deleteMany();
  await prisma.group.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.course.deleteMany();
  await prisma.student.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.admin.deleteMany();

  // Crear Estudiantes
  const students = await Promise.all([
    prisma.student.create({
      data: {
        email: 'juan.garcia@estudiante.com',
        name: 'Juan',
        surname: 'García',
        ndSurname: 'López',
        birthDate: new Date('2005-03-15'),
        dni: '12345678A',
      },
    }),
    prisma.student.create({
      data: {
        email: 'maria.martinez@estudiante.com',
        name: 'María',
        surname: 'Martínez',
        ndSurname: 'Fernández',
        birthDate: new Date('2006-07-22'),
        dni: '23456789B',
      },
    }),
    prisma.student.create({
      data: {
        email: 'pedro.sanchez@estudiante.com',
        name: 'Pedro',
        surname: 'Sánchez',
        birthDate: new Date('2005-11-08'),
        dni: '34567890C',
      },
    }),
    prisma.student.create({
      data: {
        email: 'laura.rodriguez@estudiante.com',
        name: 'Laura',
        surname: 'Rodríguez',
        ndSurname: 'Pérez',
        birthDate: new Date('2006-01-30'),
        dni: '45678901D',
      },
    }),
    prisma.student.create({
      data: {
        email: 'carlos.lopez@estudiante.com',
        name: 'Carlos',
        surname: 'López',
        ndSurname: 'Gómez',
        birthDate: new Date('2005-09-12'),
        dni: '56789012E',
      },
    }),
  ]);

  // Crear Profesores
  const teachers = await Promise.all([
    prisma.teacher.create({
      data: {
        email: 'ana.fernandez@profesor.com',
        name: 'Ana',
        surname: 'Fernández',
        ndSurname: 'Ruiz',
        birthDate: new Date('1980-05-20'),
        dni: '11111111A',
      },
    }),
    prisma.teacher.create({
      data: {
        email: 'miguel.gomez@profesor.com',
        name: 'Miguel',
        surname: 'Gómez',
        ndSurname: 'Torres',
        birthDate: new Date('1975-08-14'),
        dni: '22222222B',
      },
    }),
    prisma.teacher.create({
      data: {
        email: 'isabel.diaz@profesor.com',
        name: 'Isabel',
        surname: 'Díaz',
        birthDate: new Date('1985-12-03'),
        dni: '33333333C',
      },
    }),
    prisma.teacher.create({
      data: {
        email: 'francisco.perez@profesor.com',
        name: 'Francisco',
        surname: 'Pérez',
        ndSurname: 'Martín',
        birthDate: new Date('1978-04-25'),
        dni: '44444444D',
      },
    }),
    prisma.teacher.create({
      data: {
        email: 'carmen.ruiz@profesor.com',
        name: 'Carmen',
        surname: 'Ruiz',
        ndSurname: 'Jiménez',
        birthDate: new Date('1982-10-18'),
        dni: '55555555E',
      },
    }),
  ]);

  // Crear Administradores
  await Promise.all([
    prisma.admin.create({
      data: {
        email: 'admin1@colegio.com',
        name: 'Roberto',
        surname: 'Alonso',
        ndSurname: 'Castro',
        birthDate: new Date('1970-02-14'),
        dni: '66666666A',
      },
    }),
    prisma.admin.create({
      data: {
        email: 'admin2@colegio.com',
        name: 'Elena',
        surname: 'Moreno',
        ndSurname: 'Vega',
        birthDate: new Date('1975-06-28'),
        dni: '77777777B',
      },
    }),
    prisma.admin.create({
      data: {
        email: 'admin3@colegio.com',
        name: 'Javier',
        surname: 'Navarro',
        birthDate: new Date('1968-11-05'),
        dni: '88888888C',
      },
    }),
    prisma.admin.create({
      data: {
        email: 'admin4@colegio.com',
        name: 'Patricia',
        surname: 'Torres',
        ndSurname: 'Gil',
        birthDate: new Date('1972-09-17'),
        dni: '99999999D',
      },
    }),
    prisma.admin.create({
      data: {
        email: 'admin5@colegio.com',
        name: 'Antonio',
        surname: 'Ramírez',
        ndSurname: 'Serrano',
        birthDate: new Date('1965-03-22'),
        dni: '00000000E',
      },
    }),
  ]);

  // Crear Cursos
  const courses = await Promise.all([
    prisma.course.create({ data: { name: '1º ESO' } }),
    prisma.course.create({ data: { name: '2º ESO' } }),
    prisma.course.create({ data: { name: '3º ESO' } }),
    prisma.course.create({ data: { name: '1º Bachillerato' } }),
    prisma.course.create({ data: { name: '2º Bachillerato' } }),
  ]);

  // Crear Asignaturas
  const subjects = await Promise.all([
    prisma.subject.create({
      data: { name: 'Matemáticas', idCourse: courses[0].id },
    }),
    prisma.subject.create({
      data: { name: 'Lengua Castellana', idCourse: courses[0].id },
    }),
    prisma.subject.create({
      data: { name: 'Inglés', idCourse: courses[0].id },
    }),
    prisma.subject.create({
      data: { name: 'Física y Química', idCourse: courses[1].id },
    }),
    prisma.subject.create({
      data: { name: 'Historia', idCourse: courses[1].id },
    }),
  ]);

  // Crear Grupos
  const groups = await Promise.all([
    prisma.group.create({ data: { name: 'A', idCourse: courses[0].id } }),
    prisma.group.create({ data: { name: 'B', idCourse: courses[0].id } }),
    prisma.group.create({ data: { name: 'A', idCourse: courses[1].id } }),
    prisma.group.create({ data: { name: 'B', idCourse: courses[1].id } }),
    prisma.group.create({ data: { name: 'A', idCourse: courses[2].id } }),
    prisma.group.create({ data: {name: 'A'}
})
  ]);

  // Crear relaciones Profesor-Asignatura
  await Promise.all([
    prisma.teacherOnSubject.create({
      data: { idSubject: subjects[0].id, idTeacher: teachers[0].id },
    }),
    prisma.teacherOnSubject.create({
      data: { idSubject: subjects[0].id, idTeacher: teachers[1].id },
    }),
    prisma.teacherOnSubject.create({
      data: { idSubject: subjects[1].id, idTeacher: teachers[2].id },
    }),
    prisma.teacherOnSubject.create({
      data: { idSubject: subjects[2].id, idTeacher: teachers[3].id },
    }),
    prisma.teacherOnSubject.create({
      data: { idSubject: subjects[3].id, idTeacher: teachers[4].id },
    }),
    prisma.teacherOnSubject.create({
      data: { idSubject: subjects[4].id, idTeacher: teachers[0].id },
    }),
  ]);

  // Crear relaciones Estudiante-Asignatura-Grupo
  await Promise.all([
    // Juan en grupo A de 1º ESO
    prisma.studentOnSubjectonGroup.create({
      data: {
        idStudent: students[0].id,
        idGroup: groups[0].id,
        idSubject: subjects[0].id,
        schoolYear: '2024-2025',
      },
    }),
    prisma.studentOnSubjectonGroup.create({
      data: {
        idStudent: students[0].id,
        idGroup: groups[0].id,
        idSubject: subjects[1].id,
        schoolYear: '2024-2025',
      },
    }),
    prisma.studentOnSubjectonGroup.create({
      data: {
        idStudent: students[0].id,
        idGroup: groups[0].id,
        idSubject: subjects[2].id,
        schoolYear: '2024-2025',
      },
    }),
    // María en grupo B de 1º ESO
    prisma.studentOnSubjectonGroup.create({
      data: {
        idStudent: students[1].id,
        idGroup: groups[1].id,
        idSubject: subjects[0].id,
        schoolYear: '2024-2025',
      },
    }),
    prisma.studentOnSubjectonGroup.create({
      data: {
        idStudent: students[1].id,
        idGroup: groups[1].id,
        idSubject: subjects[1].id,
        schoolYear: '2024-2025',
      },
    }),
    // Pedro en grupo A de 2º ESO
    prisma.studentOnSubjectonGroup.create({
      data: {
        idStudent: students[2].id,
        idGroup: groups[2].id,
        idSubject: subjects[3].id,
        schoolYear: '2024-2025',
      },
    }),
    prisma.studentOnSubjectonGroup.create({
      data: {
        idStudent: students[2].id,
        idGroup: groups[2].id,
        idSubject: subjects[4].id,
        schoolYear: '2024-2025',
      },
    }),
    // Laura en grupo B de 2º ESO
    prisma.studentOnSubjectonGroup.create({
      data: {
        idStudent: students[3].id,
        idGroup: groups[3].id,
        idSubject: subjects[3].id,
        schoolYear: '2024-2025',
      },
    }),
    prisma.studentOnSubjectonGroup.create({
      data: {
        idStudent: students[3].id,
        idGroup: groups[3].id,
        idSubject: subjects[4].id,
        schoolYear: '2024-2025',
      },
    }),
    // Carlos en grupo A de 3º ESO
    prisma.studentOnSubjectonGroup.create({
      data: {
        idStudent: students[4].id,
        idGroup: groups[4].id,
        idSubject: subjects[0].id,
        schoolYear: '2024-2025',
      },
    }),
  ]);

  console.log('✅ Seed completado exitosamente!');
  console.log(`📚 ${students.length} estudiantes creados`);
  console.log(`👨‍🏫 ${teachers.length} profesores creados`);
  console.log(`🎓 ${courses.length} cursos creados`);
  console.log(`📖 ${subjects.length} asignaturas creadas`);
  console.log(`👥 ${groups.length} grupos creados`);
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });