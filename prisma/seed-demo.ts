/**
 * seed-demo.ts — Caso controlado para la exposición del TFG
 *
 * Ejecutar: npm run seed:demo
 *
 * ⚠️  ANTES DE EJECUTAR:
 *  1. Crea los 3 usuarios en Firebase Console (ver instrucciones al final del archivo).
 *  2. Pega los UIDs reales en las constantes FIREBASE_UID_* de abajo.
 *  3. npm run seed:demo
 *
 * Este script NO borra los datos existentes del seed principal.
 * Usa upsert en todo lo que puede y deleteMany acotado solo al prefijo "demo-".
 */

import { PrismaClient, TaskType, EnrollmentStatus, AssignmentStatus } from '@prisma/client';

const prisma = new PrismaClient();

// ─────────────────────────────────────────────
//  PASO 1 — Pega aquí los UIDs de Firebase
// ─────────────────────────────────────────────
const FIREBASE_UID_PROFESOR: string  = 'hDSXMkow9qMuIPxOSehAYsbsH3L2';   // profesor.demo@ziryab.es
const FIREBASE_UID_ALUMNO_1: string  = 'LKdrueilWDdRnEdFPEzMhcdC7Z63';    // alumno1.demo@ziryab.es
const FIREBASE_UID_ALUMNO_2: string  = 'r49QBujkh3OiPZkFoqSHCn6lAb83';    // alumno2.demo@ziryab.es

// ─────────────────────────────────────────────
//  Credenciales que usarás en la app
// ─────────────────────────────────────────────
// Profesor : profesor.demo@ziryab.es  /  Demo2026!
// Alumno 1 : alumno1.demo@ziryab.es   /  Demo2026!
// Alumno 2 : alumno2.demo@ziryab.es   /  Demo2026!

async function main() {
  console.log('🎬 Iniciando seed de demo...');

  const schoolYear = '2025-2026';

  // ─── LIMPIAR datos de demo previos (solo los nuestros) ──────────────────
  // Limpiamos desde los hijos hacia los padres para respetar las FKs.
  // Identificamos los registros de demo por los emails/DNIs que usamos.

  const demoEmails = [
    'profesor.demo@ziryab.es',
    'alumno1.demo@ziryab.es',
    'alumno2.demo@ziryab.es',
  ];

  const existingStudents = await prisma.student.findMany({
    where: { email: { in: demoEmails } },
    select: { id: true },
  });
  const existingTeachers = await prisma.teacher.findMany({
    where: { email: { in: demoEmails } },
    select: { id: true },
  });

  const studentIds = existingStudents.map((s) => s.id);
  const teacherIds = existingTeachers.map((t) => t.id);

  if (studentIds.length > 0 || teacherIds.length > 0) {
    console.log('  ♻️  Eliminando demo anterior...');

    // 1. StudentTasks de los enrollments de demo
    const demoEnrollments = await prisma.studentOnSubjectOnGroup.findMany({
      where: { idStudent: { in: studentIds } },
      select: { id: true },
    });
    const enrollmentIds = demoEnrollments.map((e) => e.id);
    if (enrollmentIds.length > 0) {
      await prisma.studentTask.deleteMany({ where: { idStudentEnrollment: { in: enrollmentIds } } });
      await prisma.assistance.deleteMany({ where: { idStudentEnrollment: { in: enrollmentIds } } });
    }

    // 2. Tasks de los assignments de demo
    const demoAssignments = await prisma.teacherOnSubjectOnGroup.findMany({
      where: { idTeacher: { in: teacherIds } },
      select: { id: true },
    });
    const assignmentIds = demoAssignments.map((a) => a.id);
    if (assignmentIds.length > 0) {
      // StudentTasks de tareas del profesor demo (por si acaso)
      const demoTasks = await prisma.task.findMany({
        where: { idTeacherAssignment: { in: assignmentIds } },
        select: { id: true },
      });
      const taskIds = demoTasks.map((t) => t.id);
      if (taskIds.length > 0) {
        await prisma.studentTask.deleteMany({ where: { idTask: { in: taskIds } } });
      }
      await prisma.task.deleteMany({ where: { idTeacherAssignment: { in: assignmentIds } } });
    }

    await prisma.studentOnSubjectOnGroup.deleteMany({ where: { idStudent: { in: studentIds } } });
    await prisma.teacherOnSubjectOnGroup.deleteMany({ where: { idTeacher: { in: teacherIds } } });
    await prisma.student.deleteMany({ where: { id: { in: studentIds } } });
    await prisma.teacher.deleteMany({ where: { id: { in: teacherIds } } });
  }

  // ─── PROFESOR ───────────────────────────────────────────────────────────
  console.log('  👨‍🏫 Creando profesor demo...');
  const profesor = await prisma.teacher.create({
    data: {
      email:      'profesor.demo@ziryab.es',
      name:       'Antonio',
      surname:    'Demo',
      ndSurname:  'Expo',
      birthDate:  new Date('1985-06-15'),
      dni:        '00000001D',
      firebaseUID: FIREBASE_UID_PROFESOR,
    },
  });

  // ─── ALUMNOS ─────────────────────────────────────────────────────────────
  console.log('  👨‍🎓 Creando alumnos demo...');
  const alumno1 = await prisma.student.create({
    data: {
      email:      'alumno1.demo@ziryab.es',
      name:       'Lucía',
      surname:    'Demo',
      ndSurname:  'Uno',
      birthDate:  new Date('2005-03-10'),
      dni:        '00000002A',
      firebaseUID: FIREBASE_UID_ALUMNO_1,
    },
  });

  const alumno2 = await prisma.student.create({
    data: {
      email:      'alumno2.demo@ziryab.es',
      name:       'Carlos',
      surname:    'Demo',
      ndSurname:  'Dos',
      birthDate:  new Date('2005-09-22'),
      dni:        '00000003A',
      firebaseUID: FIREBASE_UID_ALUMNO_2,
    },
  });

  // ─── CURSO + ASIGNATURA ──────────────────────────────────────────────────
  console.log('  📚 Creando curso y asignatura demo...');
  const curso = await prisma.course.upsert({
    where: { name: 'DAM - Demo TFG' },
    update: {},
    create: {
      name:        'DAM - Demo TFG',
      description: 'Ciclo de desarrollo de aplicaciones multiplataforma (caso de demo)',
      duration:    2,
    },
  });

  // upsert no funciona con @@unique([name, idCourse, grade]) directamente en Prisma
  // así que hacemos findFirst + create/update manual
  let asignatura = await prisma.subject.findFirst({
    where: { name: 'Programación Móvil', idCourse: curso.id, grade: '2' },
  });
  if (!asignatura) {
    asignatura = await prisma.subject.create({
      data: {
        name:        'Programación Móvil',
        grade:       '2',
        hours:       6,
        description: 'Desarrollo de aplicaciones Android con Kotlin y Jetpack Compose',
        idCourse:    curso.id,
      },
    });
  }

  // ─── GRUPO ───────────────────────────────────────────────────────────────
  console.log('  👥 Creando grupo demo...');
  let grupo = await prisma.group.findFirst({ where: { name: '2DAM-Demo' } });
  if (!grupo) {
    grupo = await prisma.group.create({
      data: { name: '2DAM-Demo', capacity: 25 },
    });
  }

  // ─── ASSIGNMENT (profesor → asignatura + grupo) ──────────────────────────
  console.log('  📋 Asignando profesor a asignatura...');
  const assignment = await prisma.teacherOnSubjectOnGroup.create({
    data: {
      idTeacher:  profesor.id,
      idSubject:  asignatura.id,
      idGroup:    grupo.id,
      schoolYear: schoolYear,
      status:     AssignmentStatus.ACTIVE,
    },
  });

  // ─── ENROLLMENTS (alumnos → asignatura + grupo) ──────────────────────────
  console.log('  🎓 Matriculando alumnos...');
  const enrollment1 = await prisma.studentOnSubjectOnGroup.create({
    data: {
      idStudent:  alumno1.id,
      idGroup:    grupo.id,
      idSubject:  asignatura.id,
      schoolYear: schoolYear,
      status:     EnrollmentStatus.ENROLLED,
    },
  });

  const enrollment2 = await prisma.studentOnSubjectOnGroup.create({
    data: {
      idStudent:  alumno2.id,
      idGroup:    grupo.id,
      idSubject:  asignatura.id,
      schoolYear: schoolYear,
      status:     EnrollmentStatus.ENROLLED,
    },
  });

  // ─── TAREAS ───────────────────────────────────────────────────────────────
  console.log('  📝 Creando tareas demo...');
  const now      = new Date();
  const tomorrow = new Date(now); tomorrow.setDate(now.getDate() + 1);
  const nextWeek = new Date(now); nextWeek.setDate(now.getDate() + 7);
  const passed   = new Date(now); passed.setDate(now.getDate() - 3);   // ya pasada (para demo)

  const tarea1 = await prisma.task.create({
    data: {
      idTeacherAssignment: assignment.id,
      title:               'Práctica 1 — RecyclerView con Retrofit',
      description:         'Implementar una pantalla de lista consumiendo un endpoint REST con Retrofit y mostrando los datos en un LazyColumn de Jetpack Compose.',
      type:                TaskType.PRACTICE,
      startDate:           now,
      dueDate:             nextWeek,
      isPublished:         true,
      allowLateSubmission: false,
      schoolYear:          schoolYear,
    },
  });

  const tarea2 = await prisma.task.create({
    data: {
      idTeacherAssignment: assignment.id,
      title:               'Teoría — Arquitectura MVVM',
      description:         'Leer el material adjunto sobre el patrón MVVM, Repository y StateFlow en Android. Elaborar un esquema de capas con ejemplos propios.',
      type:                TaskType.THEORY,
      startDate:           now,
      dueDate:             nextWeek,
      isPublished:         true,
      allowLateSubmission: true,
      schoolYear:          schoolYear,
    },
  });

  const tarea3 = await prisma.task.create({
    data: {
      idTeacherAssignment: assignment.id,
      title:               'Examen Parcial — Kotlin Coroutines',
      description:         'Examen teórico-práctico sobre Coroutines, Flow y manejo de estados asíncronos en ViewModels.',
      type:                TaskType.EXAM,
      startDate:           passed,
      dueDate:             passed,    // ya pasada → alumno puede ver sin entregar
      isPublished:         true,
      allowLateSubmission: false,
      schoolYear:          schoolYear,
    },
  });

  // ─── STUDENT TASKS (estado inicial: PENDING para todos) ──────────────────
  console.log('  📬 Creando student tasks...');
  await prisma.studentTask.createMany({
    data: [
      // Alumno 1 → las 3 tareas
      { idTask: tarea1.id, idStudentEnrollment: enrollment1.id, status: 'PENDING' },
      { idTask: tarea2.id, idStudentEnrollment: enrollment1.id, status: 'PENDING' },
      { idTask: tarea3.id, idStudentEnrollment: enrollment1.id, status: 'PENDING' },
      // Alumno 2 → las 3 tareas
      { idTask: tarea1.id, idStudentEnrollment: enrollment2.id, status: 'PENDING' },
      { idTask: tarea2.id, idStudentEnrollment: enrollment2.id, status: 'PENDING' },
      { idTask: tarea3.id, idStudentEnrollment: enrollment2.id, status: 'PENDING' },
    ],
  });

  // ─── RESUMEN ──────────────────────────────────────────────────────────────
  console.log('');
  console.log('✅ Seed de demo completado:');
  console.log('');
  console.log('  👨‍🏫 Profesor:');
  console.log(`     Email    : profesor.demo@ziryab.es`);
  console.log(`     Password : Demo2026!`);
  console.log(`     Firebase : ${FIREBASE_UID_PROFESOR}`);
  console.log('');
  console.log('  👨‍🎓 Alumno 1:');
  console.log(`     Email    : alumno1.demo@ziryab.es`);
  console.log(`     Password : Demo2026!`);
  console.log(`     Firebase : ${FIREBASE_UID_ALUMNO_1}`);
  console.log('');
  console.log('  👨‍🎓 Alumno 2:');
  console.log(`     Email    : alumno2.demo@ziryab.es`);
  console.log(`     Password : Demo2026!`);
  console.log(`     Firebase : ${FIREBASE_UID_ALUMNO_2}`);
  console.log('');
  console.log('  📚 Asignatura : Programación Móvil (2DAM-Demo)');
  console.log('  📝 Tareas     : 3 (PRACTICE, THEORY, EXAM)');
  console.log('  📬 StudentTasks: 6 en PENDING (2 alumnos × 3 tareas)');
  console.log('');
  console.log('  ⚡ IDs útiles para la demo:');
  console.log(`     Tarea PRACTICE  id = ${tarea1.id}  ("Práctica 1 — RecyclerView con Retrofit")`);
  console.log(`     Tarea THEORY    id = ${tarea2.id}  ("Teoría — Arquitectura MVVM")`);
  console.log(`     Tarea EXAM      id = ${tarea3.id}  ("Examen Parcial — Kotlin Coroutines")`);
  console.log(`     Enrollment Lucía  id = ${enrollment1.id}`);
  console.log(`     Enrollment Carlos id = ${enrollment2.id}`);
  console.log('');

  if (
    FIREBASE_UID_PROFESOR === 'PENDIENTE_FIREBASE_UID_PROFESOR' ||
    FIREBASE_UID_ALUMNO_1 === 'PENDIENTE_FIREBASE_UID_ALUMNO1' ||
    FIREBASE_UID_ALUMNO_2 === 'PENDIENTE_FIREBASE_UID_ALUMNO2'
  ) {
    console.log('  ⚠️  ATENCIÓN: Aún tienes los UIDs placeholder.');
    console.log('     El login en la app fallará hasta que los sustituyas por los UIDs reales de Firebase.');
    console.log('     Ver instrucciones en el bloque de comentario al inicio del archivo.');
  }
}

main()
  .catch((e) => {
    console.error('❌ Error en seed-demo:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

/*
 * ═══════════════════════════════════════════════════════
 *  INSTRUCCIONES FIREBASE — qué hacer tú antes del seed
 * ═══════════════════════════════════════════════════════
 *
 *  1. Ve a https://console.firebase.google.com
 *  2. Selecciona el proyecto del TFG.
 *  3. En el menú lateral: Authentication → Users → "Add user".
 *
 *  Crea estos 3 usuarios (email + contraseña):
 *
 *    Email                        Contraseña
 *    ─────────────────────────── ──────────
 *    profesor.demo@ziryab.es      Demo2026!
 *    alumno1.demo@ziryab.es       Demo2026!
 *    alumno2.demo@ziryab.es       Demo2026!
 *
 *  4. Una vez creados, haz clic en cada uno → verás el campo "User UID".
 *     Copia ese UID (cadena de ~28 caracteres).
 *
 *  5. Pégalos en las constantes al inicio de este archivo:
 *     FIREBASE_UID_PROFESOR  ← UID de profesor.demo@ziryab.es
 *     FIREBASE_UID_ALUMNO_1  ← UID de alumno1.demo@ziryab.es
 *     FIREBASE_UID_ALUMNO_2  ← UID de alumno2.demo@ziryab.es
 *
 *  6. Guarda y ejecuta: npm run seed:demo
 *
 *  ¿Por qué hace falta el UID de Firebase?
 *  El backend verifica el token de Firebase en cada login y lo cruza con
 *  el campo `firebaseUID` de la tabla Student/Teacher. Sin ese UID real,
 *  Firebase emite el token pero el backend no encuentra al usuario en BD
 *  y devuelve 401.
 */
