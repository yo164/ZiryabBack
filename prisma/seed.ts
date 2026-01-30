import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // Limpiar datos existentes
  await prisma.studentOnSubjectOnGroup.deleteMany();
  await prisma.teacherOnSubjectOnGroup.deleteMany();
  await prisma.group.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.course.deleteMany();
  await prisma.student.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.weekSchedule.deleteMany();
  await prisma.sessionClass.deleteMany();
  await prisma.assistance.deleteMany();
  //borrado de horariosemanal, sesion clase y asistencia

await prisma.$executeRawUnsafe(`ALTER SEQUENCE "Student_id_seq" RESTART WITH 1;`);
await prisma.$executeRawUnsafe(`ALTER SEQUENCE "Teacher_id_seq" RESTART WITH 1;`);
await prisma.$executeRawUnsafe(`ALTER SEQUENCE "Admin_id_seq" RESTART WITH 1;`);
await prisma.$executeRawUnsafe(`ALTER SEQUENCE "Course_id_seq" RESTART WITH 1;`);
await prisma.$executeRawUnsafe(`ALTER SEQUENCE "Subject_id_seq" RESTART WITH 1;`);
await prisma.$executeRawUnsafe(`ALTER SEQUENCE "Group_id_seq" RESTART WITH 1;`);
await prisma.$executeRawUnsafe(`ALTER SEQUENCE "StudentOnSubjectOnGroup_id_seq" RESTART WITH 1;`);
await prisma.$executeRawUnsafe(`ALTER SEQUENCE "TeacherOnSubjectOnGroup_id_seq" RESTART WITH 1;`);
await prisma.$executeRawUnsafe(`ALTER SEQUENCE "WeekSchedule_id_seq" RESTART WITH 1;`);
await prisma.$executeRawUnsafe(`ALTER SEQUENCE "SessionClass_id_seq" RESTART WITH 1;`);
await prisma.$executeRawUnsafe(`ALTER SEQUENCE "Assistance_id_seq" RESTART WITH 1;`);
//reinicio de conteo de id falta horario semanal, sesion clase yy asistencia 


  const acaYear = "2024-2025";

  // Crear Estudiantes
  const students = await 
    prisma.student.createMany({
      data: [{
        email: 'estudiante1@ziryab.es',
        name: 'Juan',
        surname: 'García',
        ndSurname: 'López',
        birthDate: new Date('2005-03-15'),
        dni: '12345678A',
        firebaseUID: 'XXLBaX0HvKaTjxQ7cfRAgGaSZoo1'
        
      },
      {
        email: 'estudiante2@ziryab.es',
        name: 'María',
        surname: 'López',
        ndSurname: 'Martínez',
        birthDate: new Date('2005-07-22'),
        dni: '23456789B',
        firebaseUID: 'bsnnjoIoTfZuOglbywuEbBHWmQq1'
        
      },
      {
        email: 'estudiante3@ziryab.es',
        name: 'Carlos',
        surname: 'Rodríguez',
        ndSurname: 'Fernández',
        birthDate: new Date('2004-11-08'),
        dni: '34567890C',
        firebaseUID: 'PP4iok2CLedowxkFy57UNx9kIFm2'
        
      },
      {
        email: 'estudiante4@ziryab.es',
        name: 'Lucía',
        surname: 'Fernández',
        ndSurname: 'Sánchez',
        birthDate: new Date('2005-05-30'),
        dni: '45678901D',
        firebaseUID: '6OJrP6tFrnYal5PaDPIi73Qnzdu1'
        
      },
      {
        email: 'estudiante5@ziryab.es',
        name: 'Miguel',
        surname: 'Ramírez',
        ndSurname: 'Hernández',
        birthDate: new Date('2005-02-28'),
        dni: '12345682E',
        firebaseUID: 'qudgYcZ4yffQKgwBH2fqMi7s2UW2'
        
      },
      {
        email: 'estudiante6@ziryab.es',
        name: 'Sara',
        surname: 'Díaz',
        ndSurname: 'Torres',
        birthDate: new Date('2005-07-05'),
        dni: '12345683F',
        firebaseUID: 'rLJ2pTFTqmUPMR4Ecm1EZLtei6k1'
        
      },
      {
        email: 'estudiante7@ziryab.es',
        name: 'Javier',
        surname: 'Morales',
        ndSurname: 'García',
        birthDate: new Date('2005-04-18'),
        dni: '12345684G',
        firebaseUID: 'qsDSFbH23fdeWEOLyaTjEE7Ns7q2'
        
      },
      {
        email: 'estudiante8@ziryab.es',
        name: 'Elena',
        surname: 'Vega',
        ndSurname: 'López',
        birthDate: new Date('2005-12-02'),
        dni: '12345685H',
        firebaseUID: 'Nx39bBPiNVeoHqiD02F1KgEraju2'
        
      },
      {
        email: 'estudiante9@ziryab.es',
        name: 'Raúl',
        surname: 'Soto',
        ndSurname: 'Pérez',
        birthDate: new Date('2005-05-30'),
        dni: '12345686I',
        firebaseUID: 'ushZC3Rz5XgkKDCWzHzWR4GVBlq2'
        
      },
      {
        email: 'estudiante10@ziryab.es',
        name: 'Ana',
        surname: 'Cabrera',
        ndSurname: 'Martín',
        birthDate: new Date('2005-08-19'),
        dni: '12345687J',
        firebaseUID: '43V128mDK5Ygg8zEKX09wTxNYxC2'
        
      },
      {
        email: 'estudiante11@ziryab.es',
        name: 'Diego',
        surname: 'Herrera',
        ndSurname: 'Castro',
        birthDate: new Date('2005-03-08'),
        dni: '12345688K',
        firebaseUID: 'AIaNJM2RS1RlE1gS1m5nhKRBmdh1'
        
      },
      {
        email: 'estudiante12@ziryab.es',
        name: 'Clara',
        surname: 'Ortiz',
        ndSurname: 'Ruiz',
        birthDate: new Date('2005-11-11'),
        dni: '12345689L',
        firebaseUID: 'iPlyPfaRPfOKTECfzwGRBm6Ljbe2'
        
      },
      {
        email: 'estudiante13@ziryab.es',
        name: 'Pablo',
        surname: 'Navarro',
        ndSurname: 'Santos',
        birthDate: new Date('2005-06-06'),
        dni: '12345690M',
        firebaseUID: 'YO4es7xeMTYHpHNLMl13O0KpXDx2'
        
      },
      {
        email: 'estudiante14@ziryab.es',
        name: 'Isabel',
        surname: 'Domínguez',
        ndSurname: 'Vargas',
        birthDate: new Date('2005-09-25'),
        dni: '12345691N',
        firebaseUID: 'exVQzZaGhDXJGBSXNHDNYAq1bhK2'
        
      },
      {
        email: 'estudiante15@ziryab.es',
        name: 'Sergio',
        surname: 'Gil',
        ndSurname: 'Rojas',
        birthDate: new Date('2005-01-20'),
        dni: '12345692O',
        firebaseUID: 'cG5pfVnsnLMRrqf6oZdOqtMq8K22'
        
      },
      {
        email: 'estudiante16@ziryab.es',
        name: 'Natalia',
        surname: 'Molina',
        ndSurname: 'Fernández',
        birthDate: new Date('2005-10-14'),
        dni: '12345693P',
        firebaseUID: 'iPHNwCEdq9V48B0wVR3eIhEmmPu1'
        
      }
      ]
    });


  // Crear Profesores
  const teachers = await
    prisma.teacher.createMany({
      data: [
        {
          email: 'profesor1@ziryab.es',
          name: 'David',
          surname: 'Moreno',
          ndSurname: 'García',
          birthDate: new Date('1982-01-20'),
          dni: '56789012E',
          firebaseUID: 'MKbPoFL95xejnjFmyYlImQE7tOk2',

        },
        {
          email: 'profesor2@ziryab.es',
          name: 'Ana',
          surname: 'Torres',
          ndSurname: 'Pérez',
          birthDate: new Date('1985-06-14'),
          dni: '67890123F',
          firebaseUID: 'JWmpSblNodcB9MwsFM2JNth2ZTY2',

        },
        {
          email: 'profesor3@ziryab.es',
          name: 'Pedro',
          surname: 'Jiménez',
          ndSurname: 'Ruiz',
          birthDate: new Date('1979-09-25'),
          dni: '78901234G',
          firebaseUID: 'hpkhF6ieCQOxNVsioPViTHZojCB3'
        },
        {
          email: 'profesor4@ziryab.es',
          name: 'Elena',
          surname: 'Castillo',
          ndSurname: 'Vega',
          birthDate: new Date('1987-12-03'),
          dni: '89012345H',
          firebaseUID: 'RlgqXD2vhBbHx1daDqAO3QtcApM2'
        },
        {
          email: 'profesor5@ziryab.es',
          name: 'Javier',
          surname: 'Moreno',
          ndSurname: 'Santos',
          birthDate: new Date('1982-07-14'),
          dni: '89012346I',
          firebaseUID: 'Y6QpMjvXmShHu8IZQrp4wHWqRer1',
        },
        {
          email: 'profesor6@ziryab.es',
          name: 'Marta',
          surname: 'González',
          ndSurname: 'López',
          birthDate: new Date('1990-03-22'),
          dni: '89012347J',
          firebaseUID: 'WLSA60eLGGgTSTR9fbYNeG20Cb23',
        },
        {
          email: 'profesor7@ziryab.es',
          name: 'Luis',
          surname: 'Ramírez',
          ndSurname: 'Martínez',
          birthDate: new Date('1985-09-11'),
          dni: '89012348K',
          firebaseUID: 'ClmRPX2Hk5gf0rLXSm2JSIzEU8X2',
        },
        {
          email: 'profesor8@ziryab.es',
          name: 'Ana',
          surname: 'Díaz',
          ndSurname: 'Ruiz',
          birthDate: new Date('1988-06-05'),
          dni: '89012349L',
          firebaseUID: 'UIDPROF8ABCDEFG1234567890',
        },
        {
          email: 'profesor9@ziryab.es',
          name: 'Pablo',
          surname: 'Torres',
          ndSurname: 'Castro',
          birthDate: new Date('1983-11-20'),
          dni: '89012350M',
          firebaseUID: 'Yu2CYwwrWzW4afuLBzqp48R8ZMZ2',
        },
        {
          email: 'profesor10@ziryab.es',
          name: 'Sofía',
          surname: 'Vega',
          ndSurname: 'Cabrera',
          birthDate: new Date('1989-02-18'),
          dni: '89012351N',
          firebaseUID: 'd0TNYj0kzBRi89YPltCZQqhlCE62',
        },
        {
          email: 'profesor11@ziryab.es',
          name: 'Diego',
          surname: 'Ortiz',
          ndSurname: 'Santos',
          birthDate: new Date('1986-08-25'),
          dni: '89012352O',
          firebaseUID: 'JxOBWml4w9fhtL5aHBgeEonL4kU2',
        },
        {
          email: 'profesor12@ziryab.es',
          name: 'Clara',
          surname: 'Molina',
          ndSurname: 'Fernández',
          birthDate: new Date('1991-01-14'),
          dni: '89012353P',
          firebaseUID: '4VLJu3tt0UPJOdcTRmw1n6UuKR02',
        },
        {
          email: 'profesor13@ziryab.es',
          name: 'Raúl',
          surname: 'Rojas',
          ndSurname: 'Domínguez',
          birthDate: new Date('1984-05-30'),
          dni: '89012354Q',
          firebaseUID: 'sLfuOnAaUEaGlTRZZRkx7VP1xlu2',
        },
        {
          email: 'profesor14@ziryab.es',
          name: 'Isabel',
          surname: 'Gil',
          ndSurname: 'Vargas',
          birthDate: new Date('1987-03-09'),
          dni: '89012355R',
          firebaseUID: 'g1Z5UbKbhDXcoTZKWDR4nKDOwB43',
        },
        {
          email: 'profesor15@ziryab.es',
          name: 'Andrés',
          surname: 'Soto',
          ndSurname: 'Herrera',
          birthDate: new Date('1985-12-17'),
          dni: '89012356S',
          firebaseUID: 'XoEQ8VjTY6TgEizcQdbLEZw6vC22',
        },
        {
          email: 'profesor16@ziryab.es',
          name: 'Natalia',
          surname: 'Romero',
          ndSurname: 'Pérez',
          birthDate: new Date('1989-09-02'),
          dni: '89012357T',
          firebaseUID: 'Zb0kJebCfIQ2jJUQI2vnwWxzLcf1',
        },
        {
          email: 'profesor17@ziryab.es',
          name: 'Jorge',
          surname: 'Castro',
          ndSurname: 'Vega',
          birthDate: new Date('1986-07-19'),
          dni: '89012358U',
          firebaseUID: 'KZ3uGP130zavLdfQFuibLzQbqMf2',
        },
        {
          email: 'profesor18@ziryab.es',
          name: 'Elena',
          surname: 'Ramírez',
          ndSurname: 'Martínez',
          birthDate: new Date('1988-11-23'),
          dni: '89012359V',
          firebaseUID: 'H4NvRLX4HFd4Z7Ixs9ZI0R5ru4s1',
        },
      ]
    });

  // Crear Administradores
  await prisma.admin.createMany({
    data: [
      {
        email: 'admin1@ziryab.com',
        name: 'Roberto',
        surname: 'Sánchez',
        ndSurname: 'González',
        birthDate: new Date('1975-04-10'),
        dni: '90123456I',
        firebaseUID: 'YIayPOGzYRhl6Z0qlgfRsNZ4Gli1'
      },
      {
        email: 'admin2@ziryab.com',
        name: 'Mercedes',
        surname: 'Martín',
        ndSurname: 'Díaz',
        birthDate: new Date('1980-08-18'),
        dni: '01234567J',
        firebaseUID: 'UKay0FiHWiaY880sGoqYEavKANB3'
      }
    ]
  });


  // Crear Ciclos pero ciclos de verdad no cursos tanto ingles tanta poya luego mira que pasa
  // Crear Ciclos no cursos tanto ingles tanta poya luego mira que pasa
  const courses = await
    prisma.course.createMany({
      data: [
        { name: 'DAM',
          description: 'Desarrollo de aplicaciones Multiplataforma',
          duration: 2
         },
        { name: 'DAW',
          description: 'Desarollo de aplicaciones Web',
          duration: 2
         },
        { name: 'ASIR',
          description: 'Administración de sistemas informáticos en red',
          duration: 2
         },
        { name: 'SMR',
          description: 'Sistemas microinformáticos y redes',
          duration: 2
         }
      ]
    });

  // Crear Asignaturas
  const subjects = await
    prisma.subject.createMany({
      data: [
        {
          name: 'Programación',
          grade: '1',
          hours: 8,
          description: 'Asignatura de Programación',
          idCourse: 1
        },
        {
          name: 'Base de datos',
          grade: '1',
          hours: 6,
          description: 'Asignatura de Base de Datos',
          idCourse: 1
        },
        {
          name: 'Sistemas Informáticos',
          grade: '1',
          hours: 5,
          description: 'Asignatura de Sistemas Informáticos',
          idCourse: 1
        },
        {
          name: 'Lenguaje de Marcas y Sistemas de Gestión de Información',
          grade: '1',
          hours: 3,
          description: 'Asignatura de ',
          idCourse: 1
        },
        {
          name: 'Entornos de Desarrollo',
          grade: '1',
          hours: 3,
          description: 'Asignatura de EDES',
          idCourse: 1
        },
        {
          name: 'IPE 1',
          grade: '1',
          hours: 3,
          description: 'Asignatura de IPE',
          idCourse: 1
        },
        {
          name: 'Sostenibilidad Aplicada al Sistema Productivo',
          grade: '1',
          hours: 1,
          description: 'Asignatura de Sostenibilidad',
          idCourse: 1
        },
        {
          name: 'Digitalización',
          grade: '1',
          hours: 1,
          description: 'Asignatura de Digitalización',
          idCourse: 1
        },
        {
          name: 'Programación',
          grade: '1',
          hours: 8,
          description: 'Asignatura de ',
          idCourse: 2
        },
        {
          name: 'Base de datos',
          grade: '1',
          hours: 6,
          description: 'Asignatura de ',
          idCourse: 2
        },
        {
          name: 'Sistemas Informáticos',
          grade: '1',
          hours: 5,
          description: 'Asignatura de ',
          idCourse: 2
        },
        {
          name: 'Lenguaje de Marcas y Sistemas de Gestión de Información',
          grade: '1',
          hours: 3,
          description: 'Asignatura de ',
          idCourse: 2
        },
        {
          name: 'Entornos de Desarrollo',
          grade: '1',
          hours: 3,
          description: 'Asignatura de ',
          idCourse: 2
        },
        {
          name: 'IPE 1',
          grade: '1',
          hours: 3,
          description: 'Asignatura de ',
          idCourse: 2
        },
        {
          name: 'Sostenibilidad Aplicada al Sistema Productivo',
          grade: '1',
          hours: 1,
          description: 'Asignatura de ',
          idCourse: 2
        },
        {
          name: 'Digitalización',
          grade: '1',
          hours: 1,
          description: 'Asignatura de ',
          idCourse: 2
        },
        {
          name: 'Implantación de sistemas operativos',
          grade: '1',
          hours: 7,
          description: 'Asignatura de ',
          idCourse: 3
        },
        {
          name: 'Planificación y administración de redes',
          grade: '1',
          hours: 6,
          description: 'Asignatura de ',
          idCourse: 3
        },
        {
          name: 'Fundamentos de hardware',
          grade: '1',
          hours: 3,
          description: 'Asignatura de ',
          idCourse: 3
        },
        {
          name: 'Lenguaje de Marcas y Sistemas de Gestión de Información',
          grade: '1',
          hours: 3,
          description: 'Asignatura de ',
          idCourse: 3
        },
        {
          name: 'Gestión de bases de datos',
          grade: '1',
          hours: 6,
          description: 'Asignatura de ',
          idCourse: 3
        },
        {
          name: 'IPE 1',
          grade: '1',
          hours: 3,
          description: 'Asignatura de ',
          idCourse: 3
        },
        {
          name: 'Sostenibilidad Aplicada al Sistema Productivo',
          grade: '1',
          hours: 1,
          description: 'Asignatura de ',
          idCourse: 3
        },
        {
          name: 'Digitalización',
          grade: '1',
          hours: 1,
          description: 'Asignatura de ',
          idCourse: 3
        },
        {
          name: 'Aplicaciones ofimáticas',
          grade: '1',
          hours: 7,
          description: 'Asignatura de ',
          idCourse: 4
        },
        {
          name: 'Montaje y mantenimiento de equipos',
          grade: '1',
          hours: 6,
          description: 'Asignatura de ',
          idCourse: 4
        },
        {
          name: 'Redes locales',
          grade: '1',
          hours: 7,
          description: 'Asignatura de ',
          idCourse: 4
        },
        {
          name: 'Sistemas operativos monopuesto',
          grade: '1',
          hours: 5,
          description: 'Asignatura de ',
          idCourse: 4
        },
        {
          name: 'IPE 1',
          grade: '1',
          hours: 3,
          description: 'Asignatura de ',
          idCourse: 4
        },
        {
          name: 'Sostenibilidad Aplicada al Sistema Productivo',
          grade: '1',
          hours: 1,
          description: 'Asignatura de ',
          idCourse: 4
        },
        {
          name: 'Digitalización',
          grade: '1',
          hours: 1,
          description: 'Asignatura de ',
          idCourse: 4
        },
      ]
    });

  // Crear Grupos
  const groups = await
    prisma.group.createMany({
      data: [
        {
          name: 'Mañana',
          capacity: 20
        },
        {
          name: 'Tarde',
          capacity: 20
        }
      ]
    });

  // Crear relaciones Profesor-Asignatura-Grupo

/*
  for (let i = 0; i < students.length; i++) {
    for (let j = 0; j < subjects.length; j++) {
      if ((i < 3) && (j < 9)) {
        const asignar = await Promise.all([
          prisma.studentOnSubjectOnGroup.createMany({
            data: [
              {
                idStudent: i
                idGroup: 1
                idSubject: j
              }
            ]
          })
        ])
      } else if(i < 6 && j < 17){
        const asignar = await Promise.all([
          prisma.studentOnSubjectOnGroup.createMany({
            data: [
              {
                idStudent: i
                idGroup: 1
                idSubject: j
              }
            ]
          })
        ])
      } else if(i < 9 && j < 25){
        const asignar = await Promise.all([
          prisma.studentOnSubjectOnGroup.createMany({
            data: [
              {
                idStudent: i
                idGroup: 1
                idSubject: j
              }
            ]
          })
        ])
      }else if(i < 6 && j < 17){
        const asignar = await Promise.all([
          prisma.studentOnSubjectOnGroup.createMany({
            data: [
              {
                idStudent: i
                idGroup: 1
                idSubject: j
              }
            ]
          })
        ])
      } else if(i < 6 && j < 17){
        const asignar = await Promise.all([
          prisma.studentOnSubjectOnGroup.createMany({
            data: [
              {
                idStudent: i
                idGroup: 1
                idSubject: j
              }
            ]
          })
        ])
      }
      

    }

  }
  */
  const enrollments = await


    prisma.studentOnSubjectOnGroup.createMany({


      data: [
        //Estudiante 1 en DAM grupo mañana
        {
          idStudent: 1,
          idGroup: 1,
          idSubject: 1,
          schoolYear: acaYear
        },
        {
          idStudent: 1,
          idGroup: 1,
          idSubject: 2,
          schoolYear: acaYear
        },
        {
          idStudent: 1,
          idGroup: 1,
          idSubject: 3,
          schoolYear: acaYear
        },
        {
          idStudent: 1,
          idGroup: 1,
          idSubject: 4,
          schoolYear: acaYear
        },
        {
          idStudent: 1,
          idGroup: 1,
          idSubject: 5,
          schoolYear: acaYear
        },
        {
          idStudent: 1,
          idGroup: 1,
          idSubject: 6,
          schoolYear: acaYear
        },
        {
          idStudent: 1,
          idGroup: 1,
          idSubject: 7,
          schoolYear: acaYear
        },
        {
          idStudent: 1,
          idGroup: 1,
          idSubject: 8,
          schoolYear: acaYear
        },
        //Estudiante 2 en DAM grupo mañana
        {
          idStudent: 2,
          idGroup: 1,
          idSubject: 1,
          schoolYear: acaYear
        },
        {
          idStudent: 2,
          idGroup: 1,
          idSubject: 2,
          schoolYear: acaYear
        },
        {
          idStudent: 2,
          idGroup: 1,
          idSubject: 3,
          schoolYear: acaYear
        },
        {
          idStudent: 2,
          idGroup: 1,
          idSubject: 4,
          schoolYear: acaYear
        },
        {
          idStudent: 2,
          idGroup: 1,
          idSubject: 5,
          schoolYear: acaYear
        },
        {
          idStudent: 2,
          idGroup: 1,
          idSubject: 6,
          schoolYear: acaYear
        },
        {
          idStudent: 2,
          idGroup: 1,
          idSubject: 7,
          schoolYear: acaYear
        },
        {
          idStudent: 2,
          idGroup: 1,
          idSubject: 8,
          schoolYear: acaYear
        },
        //Estudiante 3 en DAM grupo mañana
        {
          idStudent: 3,
          idGroup: 1,
          idSubject: 1,
          schoolYear: acaYear
        },
        {
          idStudent: 3,
          idGroup: 1,
          idSubject: 2,
          schoolYear: acaYear
        },
        {
          idStudent: 3,
          idGroup: 1,
          idSubject: 3,
          schoolYear: acaYear
        },
        {
          idStudent: 3,
          idGroup: 1,
          idSubject: 4,
          schoolYear: acaYear
        },
        {
          idStudent: 3,
          idGroup: 1,
          idSubject: 5,
          schoolYear: acaYear
        },
        {
          idStudent: 3,
          idGroup: 1,
          idSubject: 6,
          schoolYear: acaYear
        },
        {
          idStudent: 3,
          idGroup: 1,
          idSubject: 7,
          schoolYear: acaYear
        },
        {
          idStudent: 3,
          idGroup: 1,
          idSubject: 8,
          schoolYear: acaYear
        },
        //Estudiante 4 en DAM grupo tarde
        {
          idStudent: 4,
          idGroup: 2,
          idSubject: 1,
          schoolYear: acaYear
        },
        {
          idStudent: 4,
          idGroup: 2,
          idSubject: 2,
          schoolYear: acaYear
        },
        {
          idStudent: 4,
          idGroup: 2,
          idSubject: 3,
          schoolYear: acaYear
        },
        {
          idStudent: 4,
          idGroup: 2,
          idSubject: 4,
          schoolYear: acaYear
        },
        {
          idStudent: 4,
          idGroup: 2,
          idSubject: 5,
          schoolYear: acaYear
        },
        {
          idStudent: 4,
          idGroup: 2,
          idSubject: 6,
          schoolYear: acaYear
        },
        {
          idStudent: 4,
          idGroup: 2,
          idSubject: 7,
          schoolYear: acaYear
        },
        {
          idStudent: 4,
          idGroup: 2,
          idSubject: 8,
          schoolYear: acaYear
        },
        //Estudiante 5 en DAM grupo Tarde
        {
          idStudent: 5,
          idGroup: 2,
          idSubject: 1,
          schoolYear: acaYear
        },
        {
          idStudent: 5,
          idGroup: 2,
          idSubject: 2,
          schoolYear: acaYear
        },
        {
          idStudent: 5,
          idGroup: 2,
          idSubject: 3,
          schoolYear: acaYear
        },
        {
          idStudent: 5,
          idGroup: 2,
          idSubject: 4,
          schoolYear: acaYear
        },
        {
          idStudent: 5,
          idGroup: 2,
          idSubject: 5,
          schoolYear: acaYear
        },
        {
          idStudent: 5,
          idGroup: 2,
          idSubject: 6,
          schoolYear: acaYear
        },
        {
          idStudent: 5,
          idGroup: 2,
          idSubject: 7,
          schoolYear: acaYear
        },
        {
          idStudent: 5,
          idGroup: 2,
          idSubject: 8,
          schoolYear: acaYear
        },
        //Estudiante 6 en DAM grupo Tarde
        {
          idStudent: 6,
          idGroup: 2,
          idSubject: 1,
          schoolYear: acaYear
        },
        {
          idStudent: 6,
          idGroup: 2,
          idSubject: 2,
          schoolYear: acaYear
        },
        {
          idStudent: 6,
          idGroup: 2,
          idSubject: 3,
          schoolYear: acaYear
        },
        {
          idStudent: 6,
          idGroup: 2,
          idSubject: 4,
          schoolYear: acaYear
        },
        {
          idStudent: 6,
          idGroup: 2,
          idSubject: 5,
          schoolYear: acaYear
        },
        {
          idStudent: 6,
          idGroup: 2,
          idSubject: 6,
          schoolYear: acaYear
        },
        {
          idStudent: 6,
          idGroup: 2,
          idSubject: 7,
          schoolYear: acaYear
        },
        {
          idStudent: 6,
          idGroup: 2,
          idSubject: 8,
          schoolYear: acaYear
        },
        //Estudiante 7 en DAW grupo mañana
        {
          idStudent: 7,
          idGroup: 1,
          idSubject: 9,
          schoolYear: acaYear
        },
        {
          idStudent: 7,
          idGroup: 1,
          idSubject: 10,
          schoolYear: acaYear
        },
        {
          idStudent: 7,
          idGroup: 1,
          idSubject: 11,
          schoolYear: acaYear
        },
        {
          idStudent: 7,
          idGroup: 1,
          idSubject: 12,
          schoolYear: acaYear
        },
        {
          idStudent: 7,
          idGroup: 1,
          idSubject: 13,
          schoolYear: acaYear
        },
        {
          idStudent: 7,
          idGroup: 1,
          idSubject: 14,
          schoolYear: acaYear
        },
        {
          idStudent: 7,
          idGroup: 1,
          idSubject: 15,
          schoolYear: acaYear
        },
        {
          idStudent: 7,
          idGroup: 1,
          idSubject: 16,
          schoolYear: acaYear
        },
        //Estudiante 8 en DAW grupo mañana
        {
          idStudent: 8,
          idGroup: 1,
          idSubject: 9,
          schoolYear: acaYear
        },
        {
          idStudent: 8,
          idGroup: 1,
          idSubject: 10,
          schoolYear: acaYear
        },
        {
          idStudent: 8,
          idGroup: 1,
          idSubject: 11,
          schoolYear: acaYear
        },
        {
          idStudent: 8,
          idGroup: 1,
          idSubject: 12,
          schoolYear: acaYear
        },
        {
          idStudent: 8,
          idGroup: 1,
          idSubject: 13,
          schoolYear: acaYear
        },
        {
          idStudent: 8,
          idGroup: 1,
          idSubject: 14,
          schoolYear: acaYear
        },
        {
          idStudent: 8,
          idGroup: 1,
          idSubject: 15,
          schoolYear: acaYear
        },
        {
          idStudent: 8,
          idGroup: 1,
          idSubject: 16,
          schoolYear: acaYear
        },
        // Estudiante 9 en DAW grupo mañana
        {
          idStudent: 9,
          idGroup: 1,
          idSubject: 9,
          schoolYear: acaYear
        },
        {
          idStudent: 9,
          idGroup: 1,
          idSubject: 10,
          schoolYear: acaYear
        },
        {
          idStudent: 9,
          idGroup: 1,
          idSubject: 11,
          schoolYear: acaYear
        },
        {
          idStudent: 9,
          idGroup: 1,
          idSubject: 12,
          schoolYear: acaYear
        },
        {
          idStudent: 9,
          idGroup: 1,
          idSubject: 13,
          schoolYear: acaYear
        },
        {
          idStudent: 9,
          idGroup: 1,
          idSubject: 14,
          schoolYear: acaYear
        },
        {
          idStudent: 9,
          idGroup: 1,
          idSubject: 15,
          schoolYear: acaYear
        },
        {
          idStudent: 9,
          idGroup: 1,
          idSubject: 16,
          schoolYear: acaYear
        },
        //Estudiante 10 en DAW grupo tarde
        {
          idStudent: 10,
          idGroup: 2,
          idSubject: 9,
          schoolYear: acaYear
        },
        {
          idStudent: 10,
          idGroup: 2,
          idSubject: 10,
          schoolYear: acaYear
        },
        {
          idStudent: 10,
          idGroup: 2,
          idSubject: 11,
          schoolYear: acaYear
        },
        {
          idStudent: 10,
          idGroup: 2,
          idSubject: 12,
          schoolYear: acaYear
        },
        {
          idStudent: 10,
          idGroup: 2,
          idSubject: 13,
          schoolYear: acaYear
        },
        {
          idStudent: 10,
          idGroup: 2,
          idSubject: 14,
          schoolYear: acaYear
        },
        {
          idStudent: 10,
          idGroup: 2,
          idSubject: 15,
          schoolYear: acaYear
        },
        {
          idStudent: 10,
          idGroup: 2,
          idSubject: 16,
          schoolYear: acaYear
        },
        //Estudiante 11 en DAW grupo tarde
        {
          idStudent: 11,
          idGroup: 2,
          idSubject: 9,
          schoolYear: acaYear
        },
        {
          idStudent: 11,
          idGroup: 2,
          idSubject: 10,
          schoolYear: acaYear
        },
        {
          idStudent: 11,
          idGroup: 2,
          idSubject: 11,
          schoolYear: acaYear
        },
        {
          idStudent: 11,
          idGroup: 2,
          idSubject: 12,
          schoolYear: acaYear
        },
        {
          idStudent: 11,
          idGroup: 2,
          idSubject: 13,
          schoolYear: acaYear
        },
        {
          idStudent: 11,
          idGroup: 2,
          idSubject: 14,
          schoolYear: acaYear
        },
        {
          idStudent: 11,
          idGroup: 2,
          idSubject: 15,
          schoolYear: acaYear
        },
        {
          idStudent: 11,
          idGroup: 2,
          idSubject: 16,
          schoolYear: acaYear
        },
        //Estudiante 12 en DAW grupo tarde
        {
          idStudent: 12,
          idGroup: 2,
          idSubject: 9,
          schoolYear: acaYear
        },
        {
          idStudent: 12,
          idGroup: 2,
          idSubject: 10,
          schoolYear: acaYear
        },
        {
          idStudent: 12,
          idGroup: 2,
          idSubject: 11,
          schoolYear: acaYear
        },
        {
          idStudent: 12,
          idGroup: 2,
          idSubject: 12,
          schoolYear: acaYear
        },
        {
          idStudent: 12,
          idGroup: 2,
          idSubject: 13,
          schoolYear: acaYear
        },
        {
          idStudent: 12,
          idGroup: 2,
          idSubject: 14,
          schoolYear: acaYear
        },
        {
          idStudent: 12,
          idGroup: 2,
          idSubject: 15,
          schoolYear: acaYear
        },
        {
          idStudent: 12,
          idGroup: 2,
          idSubject: 16,
          schoolYear: acaYear
        },
        //Estudiante 13 en ASIR grupo mañana
        {
          idStudent: 13,
          idGroup: 1,
          idSubject: 17,
          schoolYear: acaYear
        },
        {
          idStudent: 13,
          idGroup: 1,
          idSubject: 18,
          schoolYear: acaYear
        },
        {
          idStudent: 13,
          idGroup: 1,
          idSubject: 19,
          schoolYear: acaYear
        },
        {
          idStudent: 13,
          idGroup: 1,
          idSubject: 20,
          schoolYear: acaYear
        },
        {
          idStudent: 13,
          idGroup: 1,
          idSubject: 21,
          schoolYear: acaYear
        },
        {
          idStudent: 13,
          idGroup: 1,
          idSubject: 22,
          schoolYear: acaYear
        },
        {
          idStudent: 13,
          idGroup: 1,
          idSubject: 23,
          schoolYear: acaYear
        },
        {
          idStudent: 13,
          idGroup: 1,
          idSubject: 24,
          schoolYear: acaYear
        },
        //Estudiante 14 en ASIR grupo mañana
        {
          idStudent: 14,
          idGroup: 1,
          idSubject: 17,
          schoolYear: acaYear
        },
        {
          idStudent: 14,
          idGroup: 1,
          idSubject: 18,
          schoolYear: acaYear
        },
        {
          idStudent: 14,
          idGroup: 1,
          idSubject: 19,
          schoolYear: acaYear
        },
        {
          idStudent: 14,
          idGroup: 1,
          idSubject: 20,
          schoolYear: acaYear
        },
        {
          idStudent: 14,
          idGroup: 1,
          idSubject: 21,
          schoolYear: acaYear
        },
        {
          idStudent: 14,
          idGroup: 1,
          idSubject: 22,
          schoolYear: acaYear
        },
        {
          idStudent: 14,
          idGroup: 1,
          idSubject: 23,
          schoolYear: acaYear
        },
        {
          idStudent: 14,
          idGroup: 1,
          idSubject: 24,
          schoolYear: acaYear
        },
        //Estudiante 15 en ASIR grupo mañana
        {
          idStudent: 15,
          idGroup: 1,
          idSubject: 17,
          schoolYear: acaYear
        },
        {
          idStudent: 15,
          idGroup: 1,
          idSubject: 18,
          schoolYear: acaYear
        },
        {
          idStudent: 15,
          idGroup: 1,
          idSubject: 19,
          schoolYear: acaYear
        },
        {
          idStudent: 15,
          idGroup: 1,
          idSubject: 20,
          schoolYear: acaYear
        },
        {
          idStudent: 15,
          idGroup: 1,
          idSubject: 21,
          schoolYear: acaYear
        },
        {
          idStudent: 15,
          idGroup: 1,
          idSubject: 22,
          schoolYear: acaYear
        },
        {
          idStudent: 15,
          idGroup: 1,
          idSubject: 23,
          schoolYear: acaYear
        },
        {
          idStudent: 15,
          idGroup: 1,
          idSubject: 24,
          schoolYear: acaYear
        },
      ]
    });
  
  

    // Crear relaciones Profesor-Asignatura-Grupo
    const assignments = await
      prisma.teacherOnSubjectOnGroup.createMany({
        data: [
          //DAM MAÑANA
          //profesor 1 programación DAM mañana (juanarrow)
          {
            idTeacher: 1,
            idSubject: 1,
            idGroup: 1,
            schoolYear: acaYear
          },
          //profesor 2 bbdd DAM mañana (eva)
          {
            idTeacher: 2,
            idSubject: 2,
            idGroup: 1,
            schoolYear: acaYear
          },
          //profesor 3 sistemas DAM mañana (gregorio)
          {
            idTeacher: 3,
            idSubject: 3,
            idGroup: 1,
            schoolYear: acaYear
          },
          //profesor 4 Lenguaje de marcas DAM mañana (el bajas)
          {
            idTeacher: 4,
            idSubject: 4,
            idGroup: 1,
            schoolYear: acaYear
          },
          //profesor 5 Entornos de desarrollo DAM mañana (fernando parra)
          {
            idTeacher: 5,
            idSubject: 5,
            idGroup: 1,
            schoolYear: acaYear
          },
          // profesor 6 Ipe Dam mañana (rosamunda)
          {
            idTeacher: 6,
            idSubject: 6,
            idGroup: 1,
            schoolYear: acaYear
          },
          // profesor 7 sostenibilidad dam mañana (el bizco)
          {
            idTeacher: 7,
            idSubject: 7,
            idGroup: 1,
            schoolYear: acaYear
          },
          //profesor 2 digitalización dam mañana (eva)
          {
            idTeacher: 2,
            idSubject: 8,
            idGroup: 1,
            schoolYear: acaYear
          },

          //profesor8 da programacion en 1 daw de mañana
          {
            idTeacher: 8,
            idSubject: 9,
            idGroup: 1,
            schoolYear: acaYear
          },

          //profesor 2 da base de daots en 1 daw de mañana
          {
            idTeacher: 2,
            idSubject: 10,
            idGroup: 1,
            schoolYear: acaYear
          },
          //profesor 9 da sistemas informaticos en 1 daw mañana
          {
            idTeacher: 9,
            idSubject: 11,
            idGroup: 1,
            schoolYear: acaYear
          },
          //profesor 10 da lenguaje de marcas en 1 daw mañana
          {
            idTeacher: 10,
            idSubject: 12,
            idGroup: 2,
            schoolYear: acaYear
          },
          //profesor 5 da edes en 1 daw mañana
          {
            idTeacher: 5,
            idSubject: 13,
            idGroup: 1,
            schoolYear: acaYear
          },
          //profesor 6 da ipe en 1 daw mañana
          {
            idTeacher: 6,
            idSubject: 14,
            idGroup: 2,
            schoolYear: acaYear
          },
          //profesor7 da sostenibilidad en 1 daw mañana
          {
            idTeacher: 7,
            idSubject: 15,
            idGroup: 1,
            schoolYear: acaYear
          },
          //profesor 1 da digitalizacion en 1 daw mañana
          {
            idTeacher: 1,
            idSubject: 16,
            idGroup: 1,
            schoolYear: acaYear
          },

          //profesor 11 da implantaciond e sitemas operativos en 1 asir mañana
          {
            idTeacher: 11,
            idSubject: 17,
            idGroup: 1,
            schoolYear: acaYear
          },
          //profesor 12 da planificacion y administracion de redes en 1 asir mañana
          {
            idTeacher: 12,
            idSubject: 18,
            idGroup: 2,
            schoolYear: acaYear
          },

          //profresor 13 da fundamentos del hardware en 1 asir mañana
          {
            idTeacher: 13,
            idSubject: 19,
            idGroup: 1,
            schoolYear: acaYear
          },
          //profesor 4 da lenguaje de marcas en 1 asir mañana(bajas)
          {
            idTeacher: 4,
            idSubject: 20,
            idGroup: 1,
            schoolYear: acaYear
          },

          //profesor 14 da gestion de base de datos 1 asir mañana
          {
            idTeacher: 14,
            idSubject: 21,
            idGroup: 1,
            schoolYear: acaYear
          },
          //profesor 6 da ipe en 1 asir mañana
          {
            idTeacher: 6,
            idSubject: 22,
            idGroup: 2,
            schoolYear: acaYear
          },
          //profesor 7 da sostenibilidad en 1 asir mañana
          {
            idTeacher: 7,
            idSubject: 23,
            idGroup: 1,
            schoolYear: acaYear
          },
          //profesor 4 da digitalizacion en 1 asir mañana
          {
            idTeacher: 4,
            idSubject: 24,
            idGroup: 1,
            schoolYear: acaYear
          },
          //SMR
          //profesor 15 da aplicaciones ofimaticas en 1 smr mañana
          {
            idTeacher: 15,
            idSubject: 25,
            idGroup: 1,
            schoolYear: acaYear
          },
          //profesor 13 da montaje y mantenimiento de equipos 1 smr mañana
          {
            idTeacher: 13,
            idSubject: 26,
            idGroup: 2,
            schoolYear: acaYear
          },
          //profesor 12 da redes locales en 1 smr mañana
          {
            idTeacher: 12,
            idSubject: 27,
            idGroup: 1,
            schoolYear: acaYear
          },
          //profesor 11 da sistemas operativos en 1 smr mañana
          {
            idTeacher: 11,
            idSubject: 28,
            idGroup: 2,
            schoolYear: acaYear
          },
          //profesor 6 da ipe en 1 smr de mañana
          {
            idTeacher: 6,
            idSubject: 29,
            idGroup: 1,
            schoolYear: acaYear
          },
          //profesor 7 da sostenibilidad 1 smr mañana
          {
            idTeacher: 7,
            idSubject: 30,
            idGroup: 2,
            schoolYear: acaYear
          },
          //profesor 3 da digitalizacion 1 smr mañana
          {
            idTeacher: 3,
            idSubject: 31,
            idGroup: 1,
            schoolYear: acaYear
          },
          //grupos tarde
          //DAM
          //profesor 16 da programación en dam tarde
          {
            idTeacher: 16,
            idSubject: 1,
            idGroup: 2,
            schoolYear: acaYear
          },
          //profesor 14 base de datos dam tarde
          {
            idTeacher: 14,
            idSubject: 2,
            idGroup: 2,
            schoolYear: acaYear
          },
          //profesor 13 da sistemas informáticos en dam tarde
          {
            idTeacher: 13,
            idSubject: 3,
            idGroup: 2,
            schoolYear: acaYear
          },
          //profesor 18 da lenguaje de marcas dam tarde
          {
            idTeacher: 18,
            idSubject: 4,
            idGroup: 2,
            schoolYear: acaYear
          },
          //profesor 5 da EDES en dam tarde
          {
            idTeacher: 5,
            idSubject: 5,
            idGroup: 2,
            schoolYear: acaYear
          },
          //profesor 17 da ipe en dam tarde
          {
            idTeacher: 17,
            idSubject: 6,
            idGroup: 2,
            schoolYear: acaYear
          },
          //profesor 18 da digitalización en dam tarde
          {
            idTeacher: 18,
            idSubject: 7,
            idGroup: 2,
            schoolYear: acaYear
          },
          //profesor 7 da sostenibilidad dam tarde
          {
            idTeacher: 7,
            idSubject: 8,
            idGroup: 2,
            schoolYear: acaYear
          },
          //DAW
          //profesor 15 da programaciçon en daw tarde
          {
            idTeacher: 15,
            idSubject: 9,
            idGroup: 2,
            schoolYear: acaYear
          },
          //profesor 18 da base de datos daw tarde
          {
            idTeacher: 18,
            idSubject: 10,
            idGroup: 2,
            schoolYear: acaYear
          },
          //profesor  15 da sistemas informaticos en daw tarde
          {
            idTeacher: 15,
            idSubject: 11,
            idGroup: 2,
            schoolYear: acaYear
          },
          //profesor 18 da lenguaje de marcas en daw tarde
          {
            idTeacher: 18,
            idSubject: 12,
            idGroup: 2,
            schoolYear: acaYear
          },
          //profesor 16 da edes en daw tarde
          {
            idTeacher: 16,
            idSubject: 13,
            idGroup: 2,
            schoolYear: acaYear
          },
          //profesor 17 da ipe en daw tarde
          {
            idTeacher: 17,
            idSubject: 14,
            idGroup: 2,
            schoolYear: acaYear
          },
          //profesor 18 da digitalización daw tarde
          {
            idTeacher: 18,
            idSubject: 15,
            idGroup: 2,
            schoolYear: acaYear
          },
          //profesor 7 da sostenibilidad en daw tarde
          {
            idTeacher: 7,
            idSubject: 16,
            idGroup: 2,
            schoolYear: acaYear
          }

        ]
      });

      const weekSchedule = await
      prisma.weekSchedule.createMany({
        data: [
          //una clase por ejemplo 1 dam mañana
          //un lunes 
          {
            idTeacherAssignment: 1,
            weekDay: 1,
            startTime: '8:15',
            finishTime: '9:15',
          },
          {
            idTeacherAssignment: 1,
            weekDay: 1,
            startTime: '9:15',
            finishTime: '10:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 1,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 1,
            startTime: '11:45',
            finishTime: '12:45',
          },
          {
            idTeacherAssignment: 3,
            weekDay: 1,
            startTime: '12:45',
            finishTime: '13:45',
          },
          {
            idTeacherAssignment: 3,
            weekDay: 1,
            startTime: '13:45',
            finishTime: '14:45',
          },
          //un martes
          {
            idTeacherAssignment: 2,
            weekDay: 2,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 2,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 2,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 2,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 2,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 2,
            startTime: '10:15',
            finishTime: '11:15',
          },
          //un miercoles
          {
            idTeacherAssignment: 2,
            weekDay: 3,
            startTime: '8:15',
            finishTime: '9:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 3,
            startTime: '9:15',
            finishTime: '10:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 3,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 3,
            startTime: '11:45',
            finishTime: '12:45',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 3,
            startTime: '12:45',
            finishTime: '13:45',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 3,
            startTime: '13:45',
            finishTime: '14:45',
          },
          //un jueves
          {
            idTeacherAssignment: 2,
            weekDay: 4,
            startTime: '8:15',
            finishTime: '9:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 4,
            startTime: '9:15',
            finishTime: '10:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 4,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 4,
            startTime: '11:45',
            finishTime: '12:45',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 4,
            startTime: '12:45',
            finishTime: '13:45',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 4,
            startTime: '13:45',
            finishTime: '14:45',
          },
          //un viernes
          {
            idTeacherAssignment: 2,
            weekDay: 5,
            startTime: '8:15',
            finishTime: '9:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 5,
            startTime: '9:15',
            finishTime: '10:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 5,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 5,
            startTime: '11:45',
            finishTime: '12:45',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 5,
            startTime: '12:45',
            finishTime: '13:45',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 5,
            startTime: '13:45',
            finishTime: '14:45',
          },

          //ahora el horario de otra clase (por ejemplo 1 daw mañana)
          {
            idTeacherAssignment: 1,
            weekDay: 1,
            startTime: '8:15',
            finishTime: '9:15',
          },
          {
            idTeacherAssignment: 1,
            weekDay: 1,
            startTime: '9:15',
            finishTime: '10:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 1,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 1,
            startTime: '11:45',
            finishTime: '12:45',
          },
          {
            idTeacherAssignment: 3,
            weekDay: 1,
            startTime: '12:45',
            finishTime: '13:45',
          },
          {
            idTeacherAssignment: 3,
            weekDay: 1,
            startTime: '13:45',
            finishTime: '14:45',
          },
          //un martes
          {
            idTeacherAssignment: 2,
            weekDay: 2,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 2,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 2,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 2,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 2,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 2,
            startTime: '10:15',
            finishTime: '11:15',
          },
          //un miercoles
          {
            idTeacherAssignment: 2,
            weekDay: 3,
            startTime: '8:15',
            finishTime: '9:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 3,
            startTime: '9:15',
            finishTime: '10:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 3,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 3,
            startTime: '11:45',
            finishTime: '12:45',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 3,
            startTime: '12:45',
            finishTime: '13:45',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 3,
            startTime: '13:45',
            finishTime: '14:45',
          },
          //un jueves
          {
            idTeacherAssignment: 2,
            weekDay: 4,
            startTime: '8:15',
            finishTime: '9:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 4,
            startTime: '9:15',
            finishTime: '10:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 4,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 4,
            startTime: '11:45',
            finishTime: '12:45',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 4,
            startTime: '12:45',
            finishTime: '13:45',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 4,
            startTime: '13:45',
            finishTime: '14:45',
          },
          //un viernes
          {
            idTeacherAssignment: 2,
            weekDay: 5,
            startTime: '8:15',
            finishTime: '9:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 5,
            startTime: '9:15',
            finishTime: '10:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 5,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 5,
            startTime: '11:45',
            finishTime: '12:45',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 5,
            startTime: '12:45',
            finishTime: '13:45',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 5,
            startTime: '13:45',
            finishTime: '14:45',
          },
          //ahora el horario semanal que corresponderá a otra clase ejemplo(1 asir mañana)
          {
            idTeacherAssignment: 1,
            weekDay: 1,
            startTime: '8:15',
            finishTime: '9:15',
          },
          {
            idTeacherAssignment: 1,
            weekDay: 1,
            startTime: '9:15',
            finishTime: '10:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 1,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 1,
            startTime: '11:45',
            finishTime: '12:45',
          },
          {
            idTeacherAssignment: 3,
            weekDay: 1,
            startTime: '12:45',
            finishTime: '13:45',
          },
          {
            idTeacherAssignment: 3,
            weekDay: 1,
            startTime: '13:45',
            finishTime: '14:45',
          },
          //un martes
          {
            idTeacherAssignment: 2,
            weekDay: 2,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 2,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 2,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 2,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 2,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 2,
            startTime: '10:15',
            finishTime: '11:15',
          },
          //un miercoles
          {
            idTeacherAssignment: 2,
            weekDay: 3,
            startTime: '8:15',
            finishTime: '9:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 3,
            startTime: '9:15',
            finishTime: '10:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 3,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 3,
            startTime: '11:45',
            finishTime: '12:45',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 3,
            startTime: '12:45',
            finishTime: '13:45',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 3,
            startTime: '13:45',
            finishTime: '14:45',
          },
          //un jueves
          {
            idTeacherAssignment: 2,
            weekDay: 4,
            startTime: '8:15',
            finishTime: '9:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 4,
            startTime: '9:15',
            finishTime: '10:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 4,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 4,
            startTime: '11:45',
            finishTime: '12:45',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 4,
            startTime: '12:45',
            finishTime: '13:45',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 4,
            startTime: '13:45',
            finishTime: '14:45',
          },
          //un viernes
          {
            idTeacherAssignment: 2,
            weekDay: 5,
            startTime: '8:15',
            finishTime: '9:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 5,
            startTime: '9:15',
            finishTime: '10:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 5,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 5,
            startTime: '11:45',
            finishTime: '12:45',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 5,
            startTime: '12:45',
            finishTime: '13:45',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 5,
            startTime: '13:45',
            finishTime: '14:45',
          },
          //ahora el horario semanal que corresponderá a otra clase 1smr mañana
          {
            idTeacherAssignment: 1,
            weekDay: 1,
            startTime: '8:15',
            finishTime: '9:15',
          },
          {
            idTeacherAssignment: 1,
            weekDay: 1,
            startTime: '9:15',
            finishTime: '10:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 1,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 1,
            startTime: '11:45',
            finishTime: '12:45',
          },
          {
            idTeacherAssignment: 3,
            weekDay: 1,
            startTime: '12:45',
            finishTime: '13:45',
          },
          {
            idTeacherAssignment: 3,
            weekDay: 1,
            startTime: '13:45',
            finishTime: '14:45',
          },
          //un martes
          {
            idTeacherAssignment: 2,
            weekDay: 2,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 2,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 2,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 2,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 2,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 2,
            startTime: '10:15',
            finishTime: '11:15',
          },
          //un miercoles
          {
            idTeacherAssignment: 2,
            weekDay: 3,
            startTime: '8:15',
            finishTime: '9:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 3,
            startTime: '9:15',
            finishTime: '10:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 3,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 3,
            startTime: '11:45',
            finishTime: '12:45',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 3,
            startTime: '12:45',
            finishTime: '13:45',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 3,
            startTime: '13:45',
            finishTime: '14:45',
          },
          //un jueves
          {
            idTeacherAssignment: 2,
            weekDay: 4,
            startTime: '8:15',
            finishTime: '9:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 4,
            startTime: '9:15',
            finishTime: '10:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 4,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 4,
            startTime: '11:45',
            finishTime: '12:45',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 4,
            startTime: '12:45',
            finishTime: '13:45',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 4,
            startTime: '13:45',
            finishTime: '14:45',
          },
          //un viernes
          {
            idTeacherAssignment: 2,
            weekDay: 5,
            startTime: '8:15',
            finishTime: '9:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 5,
            startTime: '9:15',
            finishTime: '10:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 5,
            startTime: '10:15',
            finishTime: '11:15',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 5,
            startTime: '11:45',
            finishTime: '12:45',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 5,
            startTime: '12:45',
            finishTime: '13:45',
          },
          {
            idTeacherAssignment: 2,
            weekDay: 5,
            startTime: '13:45',
            finishTime: '14:45',
          }
        ]
      });

      const classSession = await
      prisma.sessionClass.createMany({
        data: [
           // ========== SEMANA 1: 15-19 Septiembre 2025 ==========
    
    // === GRUPO 1 (1 DAM MAÑANA) - LUNES 15 Sept ===
    // Los primeros 6 registros del weekSchedule (idSchedule 1-6) corresponden al lunes del grupo 1
    {
      date: '2025-09-15T08:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 1 // Lunes 8:15-9:15, idTeacherAssignment: 1
    },
    {
      date: '2025-09-15T09:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 2 // Lunes 9:15-10:15, idTeacherAssignment: 1
    },
    {
      date: '2025-09-15T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 3 // Lunes 10:15-11:15, idTeacherAssignment: 2
    },
    {
      date: '2025-09-15T11:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 4 // Lunes 11:45-12:45, idTeacherAssignment: 2
    },
    {
      date: '2025-09-15T12:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 5 // Lunes 12:45-13:45, idTeacherAssignment: 3
    },
    {
      date: '2025-09-15T13:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 6 // Lunes 13:45-14:45, idTeacherAssignment: 3
    },

    // === GRUPO 1 (1 DAM MAÑANA) - MARTES 16 Sept ===
    // idSchedule 7-12
    {
      date: '2025-09-16T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 7
    },
    {
      date: '2025-09-16T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 8
    },
    {
      date: '2025-09-16T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 9
    },
    {
      date: '2025-09-16T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 10
    },
    {
      date: '2025-09-16T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 11
    },
    {
      date: '2025-09-16T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 12
    },

    // === GRUPO 1 (1 DAM MAÑANA) - MIÉRCOLES 17 Sept ===
    // idSchedule 13-18
    {
      date: '2025-09-17T08:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 13
    },
    {
      date: '2025-09-17T09:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 14
    },
    {
      date: '2025-09-17T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 15
    },
    {
      date: '2025-09-17T11:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 16
    },
    {
      date: '2025-09-17T12:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 17
    },
    {
      date: '2025-09-17T13:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 18
    },

    // === GRUPO 1 (1 DAM MAÑANA) - JUEVES 18 Sept ===
    // idSchedule 19-24
    {
      date: '2025-09-18T08:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 19
    },
    {
      date: '2025-09-18T09:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 20
    },
    {
      date: '2025-09-18T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 21
    },
    {
      date: '2025-09-18T11:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 22
    },
    {
      date: '2025-09-18T12:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 23
    },
    {
      date: '2025-09-18T13:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 24
    },

    // === GRUPO 1 (1 DAM MAÑANA) - VIERNES 19 Sept ===
    // idSchedule 25-30
    {
      date: '2025-09-19T08:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 25
    },
    {
      date: '2025-09-19T09:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 26
    },
    {
      date: '2025-09-19T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 27
    },
    {
      date: '2025-09-19T11:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 28
    },
    {
      date: '2025-09-19T12:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 29
    },
    {
      date: '2025-09-19T13:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 30
    },

    // === GRUPO 2 (1 DAW MAÑANA) - LUNES 15 Sept ===
    // idSchedule 31-36
    {
      date: '2025-09-15T08:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 31
    },
    {
      date: '2025-09-15T09:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 32
    },
    {
      date: '2025-09-15T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 33
    },
    {
      date: '2025-09-15T11:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 34
    },
    {
      date: '2025-09-15T12:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 35
    },
    {
      date: '2025-09-15T13:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 36
    },

    // === GRUPO 2 (1 DAW MAÑANA) - MARTES 16 Sept ===
    // idSchedule 37-42
    {
      date: '2025-09-16T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 37
    },
    {
      date: '2025-09-16T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 38
    },
    {
      date: '2025-09-16T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 39
    },
    {
      date: '2025-09-16T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 40
    },
    {
      date: '2025-09-16T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 41
    },
    {
      date: '2025-09-16T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 42
    },

    // === GRUPO 2 (1 DAW MAÑANA) - MIÉRCOLES 17 Sept ===
    // idSchedule 43-48
    {
      date: '2025-09-17T08:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 43
    },
    {
      date: '2025-09-17T09:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 44
    },
    {
      date: '2025-09-17T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 45
    },
    {
      date: '2025-09-17T11:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 46
    },
    {
      date: '2025-09-17T12:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 47
    },
    {
      date: '2025-09-17T13:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 48
    },

    // === GRUPO 2 (1 DAW MAÑANA) - JUEVES 18 Sept ===
    // idSchedule 49-54
    {
      date: '2025-09-18T08:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 49
    },
    {
      date: '2025-09-18T09:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 50
    },
    {
      date: '2025-09-18T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 51
    },
    {
      date: '2025-09-18T11:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 52
    },
    {
      date: '2025-09-18T12:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 53
    },
    {
      date: '2025-09-18T13:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 54
    },

    // === GRUPO 2 (1 DAW MAÑANA) - VIERNES 19 Sept ===
    // idSchedule 55-60
    {
      date: '2025-09-19T08:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 55
    },
    {
      date: '2025-09-19T09:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 56
    },
    {
      date: '2025-09-19T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 57
    },
    {
      date: '2025-09-19T11:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 58
    },
    {
      date: '2025-09-19T12:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 59
    },
    {
      date: '2025-09-19T13:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 60
    },

    // === GRUPO 3 (1 ASIR MAÑANA) - LUNES 15 Sept ===
    // idSchedule 61-66
    {
      date: '2025-09-15T08:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 61
    },
    {
      date: '2025-09-15T09:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 62
    },
    {
      date: '2025-09-15T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 63
    },
    {
      date: '2025-09-15T11:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 64
    },
    {
      date: '2025-09-15T12:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 65
    },
    {
      date: '2025-09-15T13:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 66
    },

    // === GRUPO 3 (1 ASIR MAÑANA) - MARTES 16 Sept ===
    // idSchedule 67-72
    {
      date: '2025-09-16T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 67
    },
    {
      date: '2025-09-16T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 68
    },
    {
      date: '2025-09-16T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 69
    },
    {
      date: '2025-09-16T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 70
    },
    {
      date: '2025-09-16T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 71
    },
    {
      date: '2025-09-16T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 72
    },

    // === GRUPO 3 (1 ASIR MAÑANA) - MIÉRCOLES 17 Sept ===
    // idSchedule 73-78
    {
      date: '2025-09-17T08:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 73
    },
    {
      date: '2025-09-17T09:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 74
    },
    {
      date: '2025-09-17T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 75
    },
    {
      date: '2025-09-17T11:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 76
    },
    {
      date: '2025-09-17T12:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 77
    },
    {
      date: '2025-09-17T13:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 78
    },

    // === GRUPO 3 (1 ASIR MAÑANA) - JUEVES 18 Sept ===
    // idSchedule 79-84
    {
      date: '2025-09-18T08:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 79
    },
    {
      date: '2025-09-18T09:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 80
    },
    {
      date: '2025-09-18T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 81
    },
    {
      date: '2025-09-18T11:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 82
    },
    {
      date: '2025-09-18T12:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 83
    },
    {
      date: '2025-09-18T13:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 84
    },

    // === GRUPO 3 (1 ASIR MAÑANA) - VIERNES 19 Sept ===
    // idSchedule 85-90
    {
      date: '2025-09-19T08:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 85
    },
    {
      date: '2025-09-19T09:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 86
    },
    {
      date: '2025-09-19T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 87
    },
    {
      date: '2025-09-19T11:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 88
    },
    {
      date: '2025-09-19T12:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 89
    },
    {
      date: '2025-09-19T13:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 90
    },

    // === GRUPO 4 (1 SMR MAÑANA) - LUNES 15 Sept ===
    // idSchedule 91-96
    {
      date: '2025-09-15T08:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 91
    },
    {
      date: '2025-09-15T09:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 92
    },
    {
      date: '2025-09-15T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 93
    },
    {
      date: '2025-09-15T11:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 94
    },
    {
      date: '2025-09-15T12:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 95
    },
    {
      date: '2025-09-15T13:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 96
    },

    // === GRUPO 4 (1 SMR MAÑANA) - MARTES 16 Sept ===
    // idSchedule 97-102
    {
      date: '2025-09-16T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 97
    },
    {
      date: '2025-09-16T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 98
    },
    {
      date: '2025-09-16T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 99
    },
    {
      date: '2025-09-16T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 100
    },
    {
      date: '2025-09-16T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 101
    },
    {
      date: '2025-09-16T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 102
    },

    // === GRUPO 4 (1 SMR MAÑANA) - MIÉRCOLES 17 Sept ===
    // idSchedule 103-108
    {
      date: '2025-09-17T08:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 103
    },
    {
      date: '2025-09-17T09:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 104
    },
    {
      date: '2025-09-17T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 105
    },
    {
      date: '2025-09-17T11:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 106
    },
    {
      date: '2025-09-17T12:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 107
    },
    {
      date: '2025-09-17T13:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 108
    },

    // === GRUPO 4 (1 SMR MAÑANA) - JUEVES 18 Sept ===
    // idSchedule 109-114
    {
      date: '2025-09-18T08:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 109
    },
    {
      date: '2025-09-18T09:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 110
    },
    {
      date: '2025-09-18T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 111
    },
    {
      date: '2025-09-18T11:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 112
    },
    {
      date: '2025-09-18T12:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 113
    },
    {
      date: '2025-09-18T13:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 114
    },

    // === GRUPO 4 (1 SMR MAÑANA) - VIERNES 19 Sept ===
    // idSchedule 115-120
    {
      date: '2025-09-19T08:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 115
    },
    {
      date: '2025-09-19T09:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 116
    },
    {
      date: '2025-09-19T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 117
    },
    {
      date: '2025-09-19T11:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 118
    },
    {
      date: '2025-09-19T12:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 119
    },
    {
      date: '2025-09-19T13:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 120
    },

    // ========== SEMANA 2: 22-26 Septiembre 2025 ==========
    
    // === GRUPO 1 (1 DAM MAÑANA) - LUNES 22 Sept ===
    {
      date: '2025-09-22T08:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 1
    },
    {
      date: '2025-09-22T09:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 2
    },
    {
      date: '2025-09-22T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 3
    },
    {
      date: '2025-09-22T11:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 4
    },
    {
      date: '2025-09-22T12:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 5
    },
    {
      date: '2025-09-22T13:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 6
    },

    // === GRUPO 1 (1 DAM MAÑANA) - MARTES 23 Sept ===
    {
      date: '2025-09-23T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 7
    },
    {
      date: '2025-09-23T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 8
    },
    {
      date: '2025-09-23T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 9
    },
    {
      date: '2025-09-23T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 10
    },
    {
      date: '2025-09-23T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 11
    },
    {
      date: '2025-09-23T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 12
    },

    // === GRUPO 1 (1 DAM MAÑANA) - MIÉRCOLES 24 Sept ===
    {
      date: '2025-09-24T08:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 13
    },
    {
      date: '2025-09-24T09:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 14
    },
    {
      date: '2025-09-24T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 15
    },
    {
      date: '2025-09-24T11:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 16
    },
    {
      date: '2025-09-24T12:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 17
    },
    {
      date: '2025-09-24T13:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 18
    },

    // === GRUPO 1 (1 DAM MAÑANA) - JUEVES 25 Sept ===
    {
      date: '2025-09-25T08:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 19
    },
    {
      date: '2025-09-25T09:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 20
    },
    {
      date: '2025-09-25T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 21
    },
    {
      date: '2025-09-25T11:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 22
    },
    {
      date: '2025-09-25T12:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 23
    },
    {
      date: '2025-09-25T13:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 24
    },

    // === GRUPO 1 (1 DAM MAÑANA) - VIERNES 26 Sept ===
    {
      date: '2025-09-26T08:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 25
    },
    {
      date: '2025-09-26T09:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 26
    },
    {
      date: '2025-09-26T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 27
    },
    {
      date: '2025-09-26T11:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 28
    },
    {
      date: '2025-09-26T12:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 29
    },
    {
      date: '2025-09-26T13:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 30
    },

    // === GRUPO 2 (1 DAW MAÑANA) - LUNES 22 Sept ===
    {
      date: '2025-09-22T08:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 31
    },
    {
      date: '2025-09-22T09:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 32
    },
    {
      date: '2025-09-22T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 33
    },
    {
      date: '2025-09-22T11:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 34
    },
    {
      date: '2025-09-22T12:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 35
    },
    {
      date: '2025-09-22T13:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 36
    },

    // === GRUPO 2 (1 DAW MAÑANA) - MARTES 23 Sept ===
    {
      date: '2025-09-23T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 37
    },
    {
      date: '2025-09-23T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 38
    },
    {
      date: '2025-09-23T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 39
    },
    {
      date: '2025-09-23T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 40
    },
    {
      date: '2025-09-23T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 41
    },
    {
      date: '2025-09-23T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 42
    },

    // === GRUPO 2 (1 DAW MAÑANA) - MIÉRCOLES 24 Sept ===
    {
      date: '2025-09-24T08:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 43
    },
    {
      date: '2025-09-24T09:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 44
    },
    {
      date: '2025-09-24T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 45
    },
    {
      date: '2025-09-24T11:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 46
    },
    {
      date: '2025-09-24T12:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 47
    },
    {
      date: '2025-09-24T13:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 48
    },

    // === GRUPO 2 (1 DAW MAÑANA) - JUEVES 25 Sept ===
    {
      date: '2025-09-25T08:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 49
    },
    {
      date: '2025-09-25T09:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 50
    },
    {
      date: '2025-09-25T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 51
    },
    {
      date: '2025-09-25T11:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 52
    },
    {
      date: '2025-09-25T12:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 53
    },
    {
      date: '2025-09-25T13:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 54
    },

    // === GRUPO 2 (1 DAW MAÑANA) - VIERNES 26 Sept ===
    {
      date: '2025-09-26T08:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 55
    },
    {
      date: '2025-09-26T09:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 56
    },
    {
      date: '2025-09-26T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 57
    },
    {
      date: '2025-09-26T11:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 58
    },
    {
      date: '2025-09-26T12:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 59
    },
    {
      date: '2025-09-26T13:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 60
    },

    // === GRUPO 3 (1 ASIR MAÑANA) - LUNES 22 Sept ===
    {
      date: '2025-09-22T08:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 61
    },
    {
      date: '2025-09-22T09:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 62
    },
    {
      date: '2025-09-22T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 63
    },
    {
      date: '2025-09-22T11:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 64
    },
    {
      date: '2025-09-22T12:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 65
    },
    {
      date: '2025-09-22T13:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 66
    },

    // === GRUPO 3 (1 ASIR MAÑANA) - MARTES 23 Sept ===
    {
      date: '2025-09-23T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 67
    },
    {
      date: '2025-09-23T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 68
    },
    {
      date: '2025-09-23T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 69
    },
    {
      date: '2025-09-23T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 70
    },
    {
      date: '2025-09-23T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 71
    },
    {
      date: '2025-09-23T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 72
    },

    // === GRUPO 3 (1 ASIR MAÑANA) - MIÉRCOLES 24 Sept ===
    {
      date: '2025-09-24T08:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 73
    },
    {
      date: '2025-09-24T09:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 74
    },
    {
      date: '2025-09-24T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 75
    },
    {
      date: '2025-09-24T11:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 76
    },
    {
      date: '2025-09-24T12:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 77
    },
    {
      date: '2025-09-24T13:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 78
    },

    // === GRUPO 3 (1 ASIR MAÑANA) - JUEVES 25 Sept ===
    {
      date: '2025-09-25T08:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 79
    },
    {
      date: '2025-09-25T09:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 80
    },
    {
      date: '2025-09-25T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 81
    },
    {
      date: '2025-09-25T11:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 82
    },
    {
      date: '2025-09-25T12:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 83
    },
    {
      date: '2025-09-25T13:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 84
    },

    // === GRUPO 3 (1 ASIR MAÑANA) - VIERNES 26 Sept ===
    {
      date: '2025-09-26T08:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 85
    },
    {
      date: '2025-09-26T09:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 86
    },
    {
      date: '2025-09-26T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 87
    },
    {
      date: '2025-09-26T11:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 88
    },
    {
      date: '2025-09-26T12:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 89
    },
    {
      date: '2025-09-26T13:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 90
    },

    // === GRUPO 4 (1 SMR MAÑANA) - LUNES 22 Sept ===
    {
      date: '2025-09-22T08:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 91
    },
    {
      date: '2025-09-22T09:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 92
    },
    {
      date: '2025-09-22T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 93
    },
    {
      date: '2025-09-22T11:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 94
    },
    {
      date: '2025-09-22T12:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 95
    },
    {
      date: '2025-09-22T13:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 96
    },

    // === GRUPO 4 (1 SMR MAÑANA) - MARTES 23 Sept ===
    {
      date: '2025-09-23T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 97
    },
    {
      date: '2025-09-23T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 98
    },
    {
      date: '2025-09-23T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 99
    },
    {
      date: '2025-09-23T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 100
    },
    {
      date: '2025-09-23T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 101
    },
    {
      date: '2025-09-23T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 102
    },

    // === GRUPO 4 (1 SMR MAÑANA) - MIÉRCOLES 24 Sept ===
    {
      date: '2025-09-24T08:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 103
    },
    {
      date: '2025-09-24T09:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 104
    },
    {
      date: '2025-09-24T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 105
    },
    {
      date: '2025-09-24T11:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 106
    },
    {
      date: '2025-09-24T12:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 107
    },
    {
      date: '2025-09-24T13:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 108
    },

    // === GRUPO 4 (1 SMR MAÑANA) - JUEVES 25 Sept ===
    {
      date: '2025-09-25T08:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 109
    },
    {
      date: '2025-09-25T09:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 110
    },
    {
      date: '2025-09-25T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 111
    },
    {
      date: '2025-09-25T11:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 112
    },
    {
      date: '2025-09-25T12:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 113
    },
    {
      date: '2025-09-25T13:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 114
    },

    // === GRUPO 4 (1 SMR MAÑANA) - VIERNES 26 Sept ===
    {
      date: '2025-09-26T08:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 115
    },
    {
      date: '2025-09-26T09:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 116
    },
    {
      date: '2025-09-26T10:15:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 117
    },
    {
      date: '2025-09-26T11:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 118
    },
    {
      date: '2025-09-26T12:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 119
    },
    {
      date: '2025-09-26T13:45:00.000Z',
      status: 'PROGRAMADA',
      apointments: '',
      idSchedule: 120
    }
          
        ]
      });

     


const assistance = await prisma.assistance.createMany({
  data: [
    // ========== SEMANA 1 - DAM (Sesiones 1-30, Estudiantes 1-3) ==========
   
    // Sesión 1
    { status: 'PRESENT', idSession: 1, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 1, idStudentEnrollment: 2 },
    { status: 'MISSING', idSession: 1, idStudentEnrollment: 3 },
   
    // Sesión 2
    { status: 'LAG', idSession: 2, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 2, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 2, idStudentEnrollment: 3 },
   
    // Sesión 3
    { status: 'PRESENT', idSession: 3, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 3, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 3, idStudentEnrollment: 3 },
   
    // Sesión 4
    { status: 'PRESENT', idSession: 4, idStudentEnrollment: 1 },
    { status: 'MISSING', idSession: 4, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 4, idStudentEnrollment: 3 },
   
    // Sesión 5
    { status: 'PRESENT', idSession: 5, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 5, idStudentEnrollment: 2 },
    { status: 'LAG', idSession: 5, idStudentEnrollment: 3 },
   
    // Sesión 6
    { status: 'PRESENT', idSession: 6, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 6, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 6, idStudentEnrollment: 3 },
   
    // Sesión 7
    { status: 'PRESENT', idSession: 7, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 7, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 7, idStudentEnrollment: 3 },
   
    // Sesión 8
    { status: 'PRESENT', idSession: 8, idStudentEnrollment: 1 },
    { status: 'MISSING', idSession: 8, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 8, idStudentEnrollment: 3 },
   
    // Sesión 9
    { status: 'PRESENT', idSession: 9, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 9, idStudentEnrollment: 2 },
    { status: 'LAG', idSession: 9, idStudentEnrollment: 3 },
   
    // Sesión 10
    { status: 'PRESENT', idSession: 10, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 10, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 10, idStudentEnrollment: 3 },
   
    // Sesión 11
    { status: 'PRESENT', idSession: 11, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 11, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 11, idStudentEnrollment: 3 },
   
    // Sesión 12
    { status: 'LAG', idSession: 12, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 12, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 12, idStudentEnrollment: 3 },
   
    // Sesión 13
    { status: 'PRESENT', idSession: 13, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 13, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 13, idStudentEnrollment: 3 },
   
    // Sesión 14
    { status: 'PRESENT', idSession: 14, idStudentEnrollment: 1 },
    { status: 'MISSING', idSession: 14, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 14, idStudentEnrollment: 3 },
   
    // Sesión 15
    { status: 'PRESENT', idSession: 15, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 15, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 15, idStudentEnrollment: 3 },
   
    // Sesión 16
    { status: 'PRESENT', idSession: 16, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 16, idStudentEnrollment: 2 },
    { status: 'LAG', idSession: 16, idStudentEnrollment: 3 },
   
    // Sesión 17
    { status: 'PRESENT', idSession: 17, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 17, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 17, idStudentEnrollment: 3 },
   
    // Sesión 18
    { status: 'PRESENT', idSession: 18, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 18, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 18, idStudentEnrollment: 3 },
   
    // Sesión 19
    { status: 'PRESENT', idSession: 19, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 19, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 19, idStudentEnrollment: 3 },
   
    // Sesión 20
    { status: 'MISSING', idSession: 20, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 20, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 20, idStudentEnrollment: 3 },
   
    // Sesión 21
    { status: 'PRESENT', idSession: 21, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 21, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 21, idStudentEnrollment: 3 },
   
    // Sesión 22
    { status: 'PRESENT', idSession: 22, idStudentEnrollment: 1 },
    { status: 'LAG', idSession: 22, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 22, idStudentEnrollment: 3 },
   
    // Sesión 23
    { status: 'PRESENT', idSession: 23, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 23, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 23, idStudentEnrollment: 3 },
   
    // Sesión 24
    { status: 'PRESENT', idSession: 24, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 24, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 24, idStudentEnrollment: 3 },
   
    // Sesión 25
    { status: 'PRESENT', idSession: 25, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 25, idStudentEnrollment: 2 },
    { status: 'MISSING', idSession: 25, idStudentEnrollment: 3 },
   
    // Sesión 26
    { status: 'PRESENT', idSession: 26, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 26, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 26, idStudentEnrollment: 3 },
   
    // Sesión 27
    { status: 'PRESENT', idSession: 27, idStudentEnrollment: 1 },
    { status: 'LAG', idSession: 27, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 27, idStudentEnrollment: 3 },
   
    // Sesión 28
    { status: 'PRESENT', idSession: 28, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 28, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 28, idStudentEnrollment: 3 },
   
    // Sesión 29
    { status: 'PRESENT', idSession: 29, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 29, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 29, idStudentEnrollment: 3 },
   
    // Sesión 30
    { status: 'PRESENT', idSession: 30, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 30, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 30, idStudentEnrollment: 3 },

    // ========== SEMANA 1 - DAW (Sesiones 31-60, Estudiantes 7-9) ==========
   
    // Sesión 31
    { status: 'PRESENT', idSession: 31, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 31, idStudentEnrollment: 65 },
    { status: 'MISSING', idSession: 31, idStudentEnrollment: 73 },
   
    // Sesión 32
    { status: 'LAG', idSession: 32, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 32, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 32, idStudentEnrollment: 73 },
   
    // Sesión 33
    { status: 'PRESENT', idSession: 33, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 33, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 33, idStudentEnrollment: 73 },
   
    // Sesión 34
    { status: 'PRESENT', idSession: 34, idStudentEnrollment: 57 },
    { status: 'MISSING', idSession: 34, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 34, idStudentEnrollment: 73 },
   
    // Sesión 35
    { status: 'PRESENT', idSession: 35, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 35, idStudentEnrollment: 65 },
    { status: 'LAG', idSession: 35, idStudentEnrollment: 73 },
   
    // Sesión 36
    { status: 'PRESENT', idSession: 36, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 36, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 36, idStudentEnrollment: 73 },
   
    // Sesión 37
    { status: 'PRESENT', idSession: 37, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 37, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 37, idStudentEnrollment: 73 },
   
    // Sesión 38
    { status: 'PRESENT', idSession: 38, idStudentEnrollment: 57 },
    { status: 'MISSING', idSession: 38, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 38, idStudentEnrollment: 73 },
   
    // Sesión 39
    { status: 'PRESENT', idSession: 39, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 39, idStudentEnrollment: 65 },
    { status: 'LAG', idSession: 39, idStudentEnrollment: 73 },
   
    // Sesión 40
    { status: 'PRESENT', idSession: 40, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 40, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 40, idStudentEnrollment: 73 },
   
    // Sesión 41
    { status: 'PRESENT', idSession: 41, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 41, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 41, idStudentEnrollment: 73 },
   
    // Sesión 42
    { status: 'LAG', idSession: 42, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 42, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 42, idStudentEnrollment: 73 },
   
    // Sesión 43
    { status: 'PRESENT', idSession: 43, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 43, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 43, idStudentEnrollment: 73 },
   
    // Sesión 44
    { status: 'PRESENT', idSession: 44, idStudentEnrollment: 57 },
    { status: 'MISSING', idSession: 44, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 44, idStudentEnrollment: 73 },
   
    // Sesión 45
    { status: 'PRESENT', idSession: 45, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 45, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 45, idStudentEnrollment: 73 },
   
    // Sesión 46
    { status: 'PRESENT', idSession: 46, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 46, idStudentEnrollment: 65 },
    { status: 'LAG', idSession: 46, idStudentEnrollment: 73 },
   
    // Sesión 47
    { status: 'PRESENT', idSession: 47, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 47, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 47, idStudentEnrollment: 73 },
   
    // Sesión 48
    { status: 'PRESENT', idSession: 48, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 48, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 48, idStudentEnrollment: 73 },
   
    // Sesión 49
    { status: 'PRESENT', idSession: 49, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 49, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 49, idStudentEnrollment: 73 },
   
    // Sesión 50
    { status: 'MISSING', idSession: 50, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 50, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 50, idStudentEnrollment: 73 },
   
    // Sesión 51
    { status: 'PRESENT', idSession: 51, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 51, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 51, idStudentEnrollment: 73 },
   
    // Sesión 52
    { status: 'PRESENT', idSession: 52, idStudentEnrollment: 57 },
    { status: 'LAG', idSession: 52, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 52, idStudentEnrollment: 73 },
   
    // Sesión 53
    { status: 'PRESENT', idSession: 53, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 53, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 53, idStudentEnrollment: 73 },
   
    // Sesión 54
    { status: 'PRESENT', idSession: 54, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 54, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 54, idStudentEnrollment: 73 },
   
    // Sesión 55
    { status: 'PRESENT', idSession: 55, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 55, idStudentEnrollment: 65 },
    { status: 'MISSING', idSession: 55, idStudentEnrollment: 73 },
   
    // Sesión 56
    { status: 'PRESENT', idSession: 56, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 56, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 56, idStudentEnrollment: 73 },
   
    // Sesión 57
    { status: 'PRESENT', idSession: 57, idStudentEnrollment: 57 },
    { status: 'LAG', idSession: 57, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 57, idStudentEnrollment: 73 },
   
    // Sesión 58
    { status: 'PRESENT', idSession: 58, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 58, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 58, idStudentEnrollment: 73 },
   
    // Sesión 59
    { status: 'PRESENT', idSession: 59, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 59, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 59, idStudentEnrollment: 73 },
   
    // Sesión 60
    { status: 'PRESENT', idSession: 60, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 60, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 60, idStudentEnrollment: 73 },

    // ========== SEMANA 1 - ASIR (Sesiones 61-90, Estudiantes 13-15) ==========
   
    // Sesión 61
    { status: 'PRESENT', idSession: 61, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 61, idStudentEnrollment: 113 },
    { status: 'MISSING', idSession: 61, idStudentEnrollment: 121 },
   
    // Sesión 62
    { status: 'LAG', idSession: 62, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 62, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 62, idStudentEnrollment: 121 },
   
    // Sesión 63
    { status: 'PRESENT', idSession: 63, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 63, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 63, idStudentEnrollment: 121 },
   
    // Sesión 64
    { status: 'PRESENT', idSession: 64, idStudentEnrollment: 105 },
    { status: 'MISSING', idSession: 64, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 64, idStudentEnrollment: 121 },
   
    // Sesión 65
    { status: 'PRESENT', idSession: 65, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 65, idStudentEnrollment: 113 },
    { status: 'LAG', idSession: 65, idStudentEnrollment: 121 },
   
    // Sesión 66
    { status: 'PRESENT', idSession: 66, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 66, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 66, idStudentEnrollment: 121 },
   
    // Sesión 67
    { status: 'PRESENT', idSession: 67, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 67, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 67, idStudentEnrollment: 121 },
   
    // Sesión 68
    { status: 'PRESENT', idSession: 68, idStudentEnrollment: 105 },
    { status: 'MISSING', idSession: 68, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 68, idStudentEnrollment: 121 },
   
    // Sesión 69
    { status: 'PRESENT', idSession: 69, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 69, idStudentEnrollment: 113 },
    { status: 'LAG', idSession: 69, idStudentEnrollment: 121 },
   
    // Sesión 70
    { status: 'PRESENT', idSession: 70, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 70, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 70, idStudentEnrollment: 121 },
   
    // Sesión 71
    { status: 'PRESENT', idSession: 71, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 71, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 71, idStudentEnrollment: 121 },
   
    // Sesión 72
    { status: 'LAG', idSession: 72, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 72, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 72, idStudentEnrollment: 121 },
   
    // Sesión 73
    { status: 'PRESENT', idSession: 73, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 73, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 73, idStudentEnrollment: 121 },
   
    // Sesión 74
    { status: 'PRESENT', idSession: 74, idStudentEnrollment: 105 },
    { status: 'MISSING', idSession: 74, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 74, idStudentEnrollment: 121 },
   
    // Sesión 75
    { status: 'PRESENT', idSession: 75, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 75, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 75, idStudentEnrollment: 121 },
   
    // Sesión 76
    { status: 'PRESENT', idSession: 76, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 76, idStudentEnrollment: 113 },
    { status: 'LAG', idSession: 76, idStudentEnrollment: 121 },
   
    // Sesión 77
    { status: 'PRESENT', idSession: 77, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 77, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 77, idStudentEnrollment: 121 },
   
    // Sesión 78
    { status: 'PRESENT', idSession: 78, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 78, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 78, idStudentEnrollment: 121 },
   
    // Sesión 79
    { status: 'PRESENT', idSession: 79, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 79, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 79, idStudentEnrollment: 121 },
   
    // Sesión 80
    { status: 'MISSING', idSession: 80, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 80, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 80, idStudentEnrollment: 121 },
   
    // Sesión 81
    { status: 'PRESENT', idSession: 81, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 81, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 81, idStudentEnrollment: 121 },
   
    // Sesión 82
    { status: 'PRESENT', idSession: 82, idStudentEnrollment: 105 },
    { status: 'LAG', idSession: 82, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 82, idStudentEnrollment: 121 },
   
    // Sesión 83
    { status: 'PRESENT', idSession: 83, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 83, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 83, idStudentEnrollment: 121 },
   
    // Sesión 84
    { status: 'PRESENT', idSession: 84, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 84, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 84, idStudentEnrollment: 121 },
   
    // Sesión 85
    { status: 'PRESENT', idSession: 85, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 85, idStudentEnrollment: 113 },
    { status: 'MISSING', idSession: 85, idStudentEnrollment: 121 },
   
    // Sesión 86
    { status: 'PRESENT', idSession: 86, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 86, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 86, idStudentEnrollment: 121 },
   
    // Sesión 87
    { status: 'PRESENT', idSession: 87, idStudentEnrollment: 105 },
    { status: 'LAG', idSession: 87, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 87, idStudentEnrollment: 121 },
   
    // Sesión 88
    { status: 'PRESENT', idSession: 88, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 88, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 88, idStudentEnrollment: 121 },
   
    // Sesión 89
    { status: 'PRESENT', idSession: 89, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 89, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 89, idStudentEnrollment: 121 },
   
    // Sesión 90
    { status: 'PRESENT', idSession: 90, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 90, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 90, idStudentEnrollment: 121 },

    // ========== SEMANA 2 - DAM (Sesiones 121-150, Estudiantes 1-3) ==========
   
    // Sesión 121
    { status: 'PRESENT', idSession: 121, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 121, idStudentEnrollment: 2 },
    { status: 'MISSING', idSession: 121, idStudentEnrollment: 3 },
   
    // Sesión 122
    { status: 'LAG', idSession: 122, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 122, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 122, idStudentEnrollment: 3 },
   
    // Sesión 123
    { status: 'PRESENT', idSession: 123, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 123, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 123, idStudentEnrollment: 3 },
   
    // Sesión 124
    { status: 'PRESENT', idSession: 124, idStudentEnrollment: 1 },
    { status: 'MISSING', idSession: 124, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 124, idStudentEnrollment: 3 },
   
    // Sesión 125
    { status: 'PRESENT', idSession: 125, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 125, idStudentEnrollment: 2 },
    { status: 'LAG', idSession: 125, idStudentEnrollment: 3 },
   
    // Sesión 126
    { status: 'PRESENT', idSession: 126, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 126, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 126, idStudentEnrollment: 3 },
   
    // Sesión 127
    { status: 'PRESENT', idSession: 127, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 127, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 127, idStudentEnrollment: 3 },
   
    // Sesión 128
    { status: 'PRESENT', idSession: 128, idStudentEnrollment: 1 },
    { status: 'MISSING', idSession: 128, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 128, idStudentEnrollment: 3 },
   
    // Sesión 129
    { status: 'PRESENT', idSession: 129, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 129, idStudentEnrollment: 2 },
    { status: 'LAG', idSession: 129, idStudentEnrollment: 3 },
   
    // Sesión 130
    { status: 'PRESENT', idSession: 130, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 130, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 130, idStudentEnrollment: 3 },
   
    // Sesión 131
    { status: 'PRESENT', idSession: 131, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 131, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 131, idStudentEnrollment: 3 },
   
    // Sesión 132
    { status: 'LAG', idSession: 132, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 132, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 132, idStudentEnrollment: 3 },
   
    // Sesión 133
    { status: 'PRESENT', idSession: 133, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 133, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 133, idStudentEnrollment: 3 },
   
    // Sesión 134
    { status: 'PRESENT', idSession: 134, idStudentEnrollment: 1 },
    { status: 'MISSING', idSession: 134, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 134, idStudentEnrollment: 3 },
   
    // Sesión 135
    { status: 'PRESENT', idSession: 135, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 135, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 135, idStudentEnrollment: 3 },
   
    // Sesión 136
    { status: 'PRESENT', idSession: 136, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 136, idStudentEnrollment: 2 },
    { status: 'LAG', idSession: 136, idStudentEnrollment: 3 },
   
    // Sesión 137
    { status: 'PRESENT', idSession: 137, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 137, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 137, idStudentEnrollment: 3 },
   
    // Sesión 138
    { status: 'PRESENT', idSession: 138, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 138, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 138, idStudentEnrollment: 3 },
   
    // Sesión 139
    { status: 'PRESENT', idSession: 139, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 139, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 139, idStudentEnrollment: 3 },
   
    // Sesión 140
    { status: 'MISSING', idSession: 140, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 140, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 140, idStudentEnrollment: 3 },
   
    // Sesión 141
    { status: 'PRESENT', idSession: 141, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 141, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 141, idStudentEnrollment: 3 },
   
    // Sesión 142
    { status: 'PRESENT', idSession: 142, idStudentEnrollment: 1 },
    { status: 'LAG', idSession: 142, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 142, idStudentEnrollment: 3 },
   
    // Sesión 143
    { status: 'PRESENT', idSession: 143, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 143, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 143, idStudentEnrollment: 3 },
   
    // Sesión 144
    { status: 'PRESENT', idSession: 144, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 144, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 144, idStudentEnrollment: 3 },
   
    // Sesión 145
    { status: 'PRESENT', idSession: 145, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 145, idStudentEnrollment: 2 },
    { status: 'MISSING', idSession: 145, idStudentEnrollment: 3 },
   
    // Sesión 146
    { status: 'PRESENT', idSession: 146, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 146, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 146, idStudentEnrollment: 3 },
   
    // Sesión 147
    { status: 'PRESENT', idSession: 147, idStudentEnrollment: 1 },
    { status: 'LAG', idSession: 147, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 147, idStudentEnrollment: 3 },
   
    // Sesión 148
    { status: 'PRESENT', idSession: 148, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 148, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 148, idStudentEnrollment: 3 },
   
    // Sesión 149
    { status: 'PRESENT', idSession: 149, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 149, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 149, idStudentEnrollment: 3 },
   
    // Sesión 150
    { status: 'PRESENT', idSession: 150, idStudentEnrollment: 1 },
    { status: 'PRESENT', idSession: 150, idStudentEnrollment: 2 },
    { status: 'PRESENT', idSession: 150, idStudentEnrollment: 3 },

    // ========== SEMANA 2 - DAW (Sesiones 151-180, Estudiantes 7-9) ==========
   
    // Sesión 151
    { status: 'PRESENT', idSession: 151, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 151, idStudentEnrollment: 65 },
    { status: 'MISSING', idSession: 151, idStudentEnrollment: 73 },
   
    // Sesión 152
    { status: 'LAG', idSession: 152, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 152, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 152, idStudentEnrollment: 73 },
   
    // Sesión 153
    { status: 'PRESENT', idSession: 153, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 153, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 153, idStudentEnrollment: 73 },
   
    // Sesión 154
    { status: 'PRESENT', idSession: 154, idStudentEnrollment: 57 },
    { status: 'MISSING', idSession: 154, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 154, idStudentEnrollment: 73 },
   
    // Sesión 155
    { status: 'PRESENT', idSession: 155, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 155, idStudentEnrollment: 65 },
    { status: 'LAG', idSession: 155, idStudentEnrollment: 73 },
   
    // Sesión 156
    { status: 'PRESENT', idSession: 156, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 156, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 156, idStudentEnrollment: 73 },
   
    // Sesión 157
    { status: 'PRESENT', idSession: 157, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 157, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 157, idStudentEnrollment: 73 },
   
    // Sesión 158
    { status: 'PRESENT', idSession: 158, idStudentEnrollment: 57 },
    { status: 'MISSING', idSession: 158, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 158, idStudentEnrollment: 73 },
   
    // Sesión 159
    { status: 'PRESENT', idSession: 159, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 159, idStudentEnrollment: 65 },
    { status: 'LAG', idSession: 159, idStudentEnrollment: 73 },
   
    // Sesión 160
    { status: 'PRESENT', idSession: 160, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 160, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 160, idStudentEnrollment: 73 },
   
    // Sesión 161
    { status: 'PRESENT', idSession: 161, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 161, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 161, idStudentEnrollment: 73 },
   
    // Sesión 162
    { status: 'LAG', idSession: 162, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 162, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 162, idStudentEnrollment: 73 },
   
    // Sesión 163
    { status: 'PRESENT', idSession: 163, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 163, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 163, idStudentEnrollment: 73 },
   
    // Sesión 164
    { status: 'PRESENT', idSession: 164, idStudentEnrollment: 57 },
    { status: 'MISSING', idSession: 164, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 164, idStudentEnrollment: 73 },
   
    // Sesión 165
    { status: 'PRESENT', idSession: 165, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 165, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 165, idStudentEnrollment: 73 },
   
    // Sesión 166
    { status: 'PRESENT', idSession: 166, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 166, idStudentEnrollment: 65 },
    { status: 'LAG', idSession: 166, idStudentEnrollment: 73 },
   
    // Sesión 167
    { status: 'PRESENT', idSession: 167, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 167, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 167, idStudentEnrollment: 73 },
   
    // Sesión 168
    { status: 'PRESENT', idSession: 168, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 168, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 168, idStudentEnrollment: 73 },
   
    // Sesión 169
    { status: 'PRESENT', idSession: 169, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 169, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 169, idStudentEnrollment: 73 },
   
    // Sesión 170
    { status: 'MISSING', idSession: 170, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 170, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 170, idStudentEnrollment: 73 },
   
    // Sesión 171
    { status: 'PRESENT', idSession: 171, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 171, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 171, idStudentEnrollment: 73 },
   
    // Sesión 172
    { status: 'PRESENT', idSession: 172, idStudentEnrollment: 57 },
    { status: 'LAG', idSession: 172, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 172, idStudentEnrollment: 73 },
   
    // Sesión 173
    { status: 'PRESENT', idSession: 173, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 173, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 173, idStudentEnrollment: 73 },
   
    // Sesión 174
    { status: 'PRESENT', idSession: 174, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 174, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 174, idStudentEnrollment: 73 },
   
    // Sesión 175
    { status: 'PRESENT', idSession: 175, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 175, idStudentEnrollment: 65 },
    { status: 'MISSING', idSession: 175, idStudentEnrollment: 73 },
   
    // Sesión 176
    { status: 'PRESENT', idSession: 176, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 176, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 176, idStudentEnrollment: 73 },
   
    // Sesión 177
    { status: 'PRESENT', idSession: 177, idStudentEnrollment: 57 },
    { status: 'LAG', idSession: 177, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 177, idStudentEnrollment: 73 },
   
    // Sesión 178
    { status: 'PRESENT', idSession: 178, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 178, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 178, idStudentEnrollment: 73 },
   
    // Sesión 179
    { status: 'PRESENT', idSession: 179, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 179, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 179, idStudentEnrollment: 73 },
   
    // Sesión 180
    { status: 'PRESENT', idSession: 180, idStudentEnrollment: 57 },
    { status: 'PRESENT', idSession: 180, idStudentEnrollment: 65 },
    { status: 'PRESENT', idSession: 180, idStudentEnrollment: 73 },

    // ========== SEMANA 2 - ASIR (Sesiones 181-210, Estudiantes 13-15) ==========
   
    // Sesión 181
    { status: 'PRESENT', idSession: 181, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 181, idStudentEnrollment: 113 },
    { status: 'MISSING', idSession: 181, idStudentEnrollment: 121 },
   
    // Sesión 182
    { status: 'LAG', idSession: 182, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 182, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 182, idStudentEnrollment: 121 },
   
    // Sesión 183
    { status: 'PRESENT', idSession: 183, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 183, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 183, idStudentEnrollment: 121 },
   
    // Sesión 184
    { status: 'PRESENT', idSession: 184, idStudentEnrollment: 105 },
    { status: 'MISSING', idSession: 184, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 184, idStudentEnrollment: 121 },
   
    // Sesión 185
    { status: 'PRESENT', idSession: 185, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 185, idStudentEnrollment: 113 },
    { status: 'LAG', idSession: 185, idStudentEnrollment: 121 },
   
    // Sesión 186
    { status: 'PRESENT', idSession: 186, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 186, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 186, idStudentEnrollment: 121 },
   
    // Sesión 187
    { status: 'PRESENT', idSession: 187, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 187, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 187, idStudentEnrollment: 121 },
   
    // Sesión 188
    { status: 'PRESENT', idSession: 188, idStudentEnrollment: 105 },
    { status: 'MISSING', idSession: 188, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 188, idStudentEnrollment: 121 },
   
    // Sesión 189
    { status: 'PRESENT', idSession: 189, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 189, idStudentEnrollment: 113 },
    { status: 'LAG', idSession: 189, idStudentEnrollment: 121 },
   
    // Sesión 190
    { status: 'PRESENT', idSession: 190, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 190, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 190, idStudentEnrollment: 121 },
   
    // Sesión 191
    { status: 'PRESENT', idSession: 191, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 191, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 191, idStudentEnrollment: 121 },
   
    // Sesión 192
    { status: 'LAG', idSession: 192, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 192, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 192, idStudentEnrollment: 121 },
   
    // Sesión 193
    { status: 'PRESENT', idSession: 193, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 193, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 193, idStudentEnrollment: 121 },
   
    // Sesión 194
    { status: 'PRESENT', idSession: 194, idStudentEnrollment: 105 },
    { status: 'MISSING', idSession: 194, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 194, idStudentEnrollment: 121 },
   
    // Sesión 195
    { status: 'PRESENT', idSession: 195, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 195, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 195, idStudentEnrollment: 121 },
   
    // Sesión 196
    { status: 'PRESENT', idSession: 196, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 196, idStudentEnrollment: 113 },
    { status: 'LAG', idSession: 196, idStudentEnrollment: 121 },
   
    // Sesión 197
    { status: 'PRESENT', idSession: 197, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 197, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 197, idStudentEnrollment: 121 },
   
    // Sesión 198
    { status: 'PRESENT', idSession: 198, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 198, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 198, idStudentEnrollment: 121 },
   
    // Sesión 199
    { status: 'PRESENT', idSession: 199, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 199, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 199, idStudentEnrollment: 121 },
   
    // Sesión 200
    { status: 'MISSING', idSession: 200, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 200, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 200, idStudentEnrollment: 121 },
   
    // Sesión 201
    { status: 'PRESENT', idSession: 201, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 201, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 201, idStudentEnrollment: 121 },
   
    // Sesión 202
    { status: 'PRESENT', idSession: 202, idStudentEnrollment: 105 },
    { status: 'LAG', idSession: 202, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 202, idStudentEnrollment: 121 },
   
    // Sesión 203
    { status: 'PRESENT', idSession: 203, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 203, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 203, idStudentEnrollment: 121 },
   
    // Sesión 204
    { status: 'PRESENT', idSession: 204, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 204, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 204, idStudentEnrollment: 121 },
   
    // Sesión 205
    { status: 'PRESENT', idSession: 205, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 205, idStudentEnrollment: 113 },
    { status: 'MISSING', idSession: 205, idStudentEnrollment: 121 },
   
    // Sesión 206
    { status: 'PRESENT', idSession: 206, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 206, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 206, idStudentEnrollment: 121 },
   
    // Sesión 207
    { status: 'PRESENT', idSession: 207, idStudentEnrollment: 105 },
    { status: 'LAG', idSession: 207, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 207, idStudentEnrollment: 121 },
   
    // Sesión 208
    { status: 'PRESENT', idSession: 208, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 208, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 208, idStudentEnrollment: 121 },
   
    // Sesión 209
    { status: 'PRESENT', idSession: 209, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 209, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 209, idStudentEnrollment: 121 },
   
    // Sesión 210
    { status: 'PRESENT', idSession: 210, idStudentEnrollment: 105 },
    { status: 'PRESENT', idSession: 210, idStudentEnrollment: 113 },
    { status: 'PRESENT', idSession: 210, idStudentEnrollment: 121 },
  ]
});





    console.log('✅ Seed completado exitosamente!');
    console.log(`📚 ${students.count} estudiantes creados`);
    console.log(`👨‍🏫 ${teachers.count} profesores creados`);
    console.log(`🎓 ${courses.count} cursos creados`);
    console.log(`📖 ${subjects.count} asignaturas creadas`);
    console.log(`👥 ${groups.count} grupos creados`);
    console.log(`👥 ${enrollments.count} enrollments creados`);
    console.log(`👥 ${assignments.count} assignments creados`);
    console.log(`👥 ${weekSchedule.count} assignments creados`);
    console.log(`👥 ${classSession.count} assignments creados`);
    console.log(`👥 ${assistance.count} assignments creados`);

  
}

  main()
    .catch((e) => {
      console.error('❌ Error durante el seed:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });