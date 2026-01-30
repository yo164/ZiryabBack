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
  //borrado de horariosemanal, sesion clase y asistencia

  await prisma.$executeRawUnsafe(`ALTER SEQUENCE "Student_id_seq" RESTART WITH 1;`);
await prisma.$executeRawUnsafe(`ALTER SEQUENCE "Teacher_id_seq" RESTART WITH 1;`);
await prisma.$executeRawUnsafe(`ALTER SEQUENCE "Admin_id_seq" RESTART WITH 1;`);
await prisma.$executeRawUnsafe(`ALTER SEQUENCE "Course_id_seq" RESTART WITH 1;`);
await prisma.$executeRawUnsafe(`ALTER SEQUENCE "Subject_id_seq" RESTART WITH 1;`);
await prisma.$executeRawUnsafe(`ALTER SEQUENCE "Group_id_seq" RESTART WITH 1;`);
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
        firebaseUID: 'XXLBaX0HvKaTjxQ7cfRAgGaSZoo1',
        isActive: true,
      },
      {
        email: 'estudiante2@ziryab.es',
        name: 'María',
        surname: 'López',
        ndSurname: 'Martínez',
        birthDate: new Date('2005-07-22'),
        dni: '23456789B',
        firebaseUID: 'bsnnjoIoTfZuOglbywuEbBHWmQq1',
        isActive: true,
      },
      {
        email: 'estudiante3@ziryab.es',
        name: 'Carlos',
        surname: 'Rodríguez',
        ndSurname: 'Fernández',
        birthDate: new Date('2004-11-08'),
        dni: '34567890C',
        firebaseUID: 'PP4iok2CLedowxkFy57UNx9kIFm2',
        isActive: true,
      },
      {
        email: 'estudiante4@ziryab.es',
        name: 'Lucía',
        surname: 'Fernández',
        ndSurname: 'Sánchez',
        birthDate: new Date('2005-05-30'),
        dni: '45678901D',
        firebaseUID: '6OJrP6tFrnYal5PaDPIi73Qnzdu1',
        isActive: true,
      },
      {
        email: 'estudiante5@ziryab.es',
        name: 'Miguel',
        surname: 'Ramírez',
        ndSurname: 'Hernández',
        birthDate: new Date('2005-02-28'),
        dni: '12345682E',
        firebaseUID: 'qudgYcZ4yffQKgwBH2fqMi7s2UW2',
        isActive: true,
      },
      {
        email: 'estudiante6@ziryab.es',
        name: 'Sara',
        surname: 'Díaz',
        ndSurname: 'Torres',
        birthDate: new Date('2005-07-05'),
        dni: '12345683F',
        firebaseUID: 'rLJ2pTFTqmUPMR4Ecm1EZLtei6k1',
        isActive: true,
      },
      {
        email: 'estudiante7@ziryab.es',
        name: 'Javier',
        surname: 'Morales',
        ndSurname: 'García',
        birthDate: new Date('2005-04-18'),
        dni: '12345684G',
        firebaseUID: 'qsDSFbH23fdeWEOLyaTjEE7Ns7q2',
        isActive: true,
      },
      {
        email: 'estudiante8@ziryab.es',
        name: 'Elena',
        surname: 'Vega',
        ndSurname: 'López',
        birthDate: new Date('2005-12-02'),
        dni: '12345685H',
        firebaseUID: 'Nx39bBPiNVeoHqiD02F1KgEraju2',
        isActive: true,
      },
      {
        email: 'estudiante9@ziryab.es',
        name: 'Raúl',
        surname: 'Soto',
        ndSurname: 'Pérez',
        birthDate: new Date('2005-05-30'),
        dni: '12345686I',
        firebaseUID: 'ushZC3Rz5XgkKDCWzHzWR4GVBlq2',
        isActive: true,
      },
      {
        email: 'estudiante10@ziryab.es',
        name: 'Ana',
        surname: 'Cabrera',
        ndSurname: 'Martín',
        birthDate: new Date('2005-08-19'),
        dni: '12345687J',
        firebaseUID: '43V128mDK5Ygg8zEKX09wTxNYxC2',
        isActive: true,
      },
      {
        email: 'estudiante11@ziryab.es',
        name: 'Diego',
        surname: 'Herrera',
        ndSurname: 'Castro',
        birthDate: new Date('2005-03-08'),
        dni: '12345688K',
        firebaseUID: 'AIaNJM2RS1RlE1gS1m5nhKRBmdh1',
        isActive: true,
      },
      {
        email: 'estudiante12@ziryab.es',
        name: 'Clara',
        surname: 'Ortiz',
        ndSurname: 'Ruiz',
        birthDate: new Date('2005-11-11'),
        dni: '12345689L',
        firebaseUID: 'iPlyPfaRPfOKTECfzwGRBm6Ljbe2',
        isActive: true,
      },
      {
        email: 'estudiante13@ziryab.es',
        name: 'Pablo',
        surname: 'Navarro',
        ndSurname: 'Santos',
        birthDate: new Date('2005-06-06'),
        dni: '12345690M',
        firebaseUID: 'YO4es7xeMTYHpHNLMl13O0KpXDx2 ',
        isActive: true,
      },
      {
        email: 'estudiante14@ziryab.es',
        name: 'Isabel',
        surname: 'Domínguez',
        ndSurname: 'Vargas',
        birthDate: new Date('2005-09-25'),
        dni: '12345691N',
        firebaseUID: 'exVQzZaGhDXJGBSXNHDNYAq1bhK2',
        isActive: true,
      },
      {
        email: 'estudiante15@ziryab.es',
        name: 'Sergio',
        surname: 'Gil',
        ndSurname: 'Rojas',
        birthDate: new Date('2005-01-20'),
        dni: '12345692O',
        firebaseUID: 'cG5pfVnsnLMRrqf6oZdOqtMq8K22',
        isActive: true,
      },
      {
        email: 'estudiante16@ziryab.es',
        name: 'Natalia',
        surname: 'Molina',
        ndSurname: 'Fernández',
        birthDate: new Date('2005-10-14'),
        dni: '12345693P',
        firebaseUID: 'iPHNwCEdq9V48B0wVR3eIhEmmPu1',
        isActive: true,
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
          hours: 10,
          description: 'Asignatura de programción',
          idCourse: 1
        },
        {
          name: 'Base de datos',
          grade: '1',
          hours: 10,
          description: 'Asignatura de programción',
          idCourse: 1
        },
        {
          name: 'Sistemas Informáticos',
          grade: '1',
          hours: 10,
          description: 'Asignatura de programción',
          idCourse: 1
        },
        {
          name: 'Lenguaje de Marcas y Sistemas de Gestión de Información',
          grade: '1',
          hours: 10,
          description: 'Asignatura de programción',
          idCourse: 1
        },
        {
          name: 'Entornos de Desarrollo',
          grade: '1',
          hours: 10,
          description: 'Asignatura de programción',
          idCourse: 1
        },
        {
          name: 'IPE 1',
          grade: '1',
          hours: 10,
          description: 'Asignatura de programción',
          idCourse: 1
        },
        {
          name: 'Sostenibilidad Aplicada al Sistema Productivo',
          grade: '1',
          hours: 10,
          description: 'Asignatura de programción',
          idCourse: 1
        },
        {
          name: 'Digitalización',
          grade: '1',
          hours: 10,
          description: 'Asignatura de programción',
          idCourse: 1
        },
        {
          name: 'Programación',
          grade: '1',
          hours: 10,
          description: 'Asignatura de programción',
          idCourse: 2
        },
        {
          name: 'Base de datos',
          grade: '1',
          hours: 10,
          description: 'Asignatura de programción',
          idCourse: 2
        },
        {
          name: 'Sistemas Informáticos',
          grade: '1',
          hours: 10,
          description: 'Asignatura de programción',
          idCourse: 2
        },
        {
          name: 'Lenguaje de Marcas y Sistemas de Gestión de Información',
          grade: '1',
          hours: 10,
          description: 'Asignatura de programción',
          idCourse: 2
        },
        {
          name: 'Entornos de Desarrollo',
          grade: '1',
          hours: 10,
          description: 'Asignatura de programción',
          idCourse: 2
        },
        {
          name: 'IPE 1',
          grade: '1',
          hours: 10,
          description: 'Asignatura de programción',
          idCourse: 2
        },
        {
          name: 'Sostenibilidad Aplicada al Sistema Productivo',
          grade: '1',
          hours: 10,
          description: 'Asignatura de programción',
          idCourse: 2
        },
        {
          name: 'Digitalización',
          grade: '1',
          hours: 10,
          description: 'Asignatura de programción',
          idCourse: 2
        },
        {
          name: 'Implantación de sistemas operativos',
          grade: '1',
          hours: 10,
          description: 'Asignatura de programción',
          idCourse: 3
        },
        {
          name: 'Planificación y administración de redes',
          grade: '1',
          hours: 10,
          description: 'Asignatura de programción',
          idCourse: 3
        },
        {
          name: 'Fundamentos de hardware',
          grade: '1',
          hours: 10,
          description: 'Asignatura de programción',
          idCourse: 3
        },
        {
          name: 'Lenguaje de Marcas y Sistemas de Gestión de Información',
          grade: '1',
          hours: 10,
          description: 'Asignatura de programción',
          idCourse: 3
        },
        {
          name: 'Gestión de bases de datos',
          grade: '1',
          hours: 10,
          description: 'Asignatura de programción',
          idCourse: 3
        },
        {
          name: 'IPE 1',
          grade: '1',
          hours: 10,
          description: 'Asignatura de programción',
          idCourse: 3
        },
        {
          name: 'Sostenibilidad Aplicada al Sistema Productivo',
          grade: '1',
          hours: 10,
          description: 'Asignatura de programción',
          idCourse: 3
        },
        {
          name: 'Digitalización',
          grade: '1',
          hours: 10,
          description: 'Asignatura de programción',
          idCourse: 3
        },
        {
          name: 'Aplicaciones ofimáticas',
          grade: '1',
          hours: 10,
          description: 'Asignatura de programción',
          idCourse: 4
        },
        {
          name: 'Montaje y mantenimiento de equipos',
          grade: '1',
          hours: 10,
          description: 'Asignatura de programción',
          idCourse: 4
        },
        {
          name: 'Redes locales',
          grade: '1',
          hours: 10,
          description: 'Asignatura de programción',
          idCourse: 4
        },
        {
          name: 'Sistemas operativos monopuesto',
          grade: '1',
          hours: 10,
          description: 'Asignatura de programción',
          idCourse: 4
        },
        {
          name: 'IPE 1',
          grade: '1',
          hours: 10,
          description: 'Asignatura de programción',
          idCourse: 4
        },
        {
          name: 'Sostenibilidad Aplicada al Sistema Productivo',
          grade: '1',
          hours: 10,
          description: 'Asignatura de programción',
          idCourse: 4
        },
        {
          name: 'Digitalización',
          grade: '1',
          hours: 10,
          description: 'Asignatura de programción',
          idCourse: 4
        },
      ]
    });

  // Crear Grupos
  const groups = await
    prisma.group.createMany({
      data: [
        {
          name: 'Tarde',
          capacity: 10
        },
        {
          name: 'Mañana',
          capacity: 10
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
          idGroup: 2,
          idSubject: 21,
          schoolYear: acaYear
        },
        {
          idStudent: 13,
          idGroup: 2,
          idSubject: 22,
          schoolYear: acaYear
        },
        {
          idStudent: 13,
          idGroup: 2,
          idSubject: 23,
          schoolYear: acaYear
        },
        {
          idStudent: 13,
          idGroup: 2,
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
          idGroup: 2,
          idSubject: 21,
          schoolYear: acaYear
        },
        {
          idStudent: 14,
          idGroup: 2,
          idSubject: 22,
          schoolYear: acaYear
        },
        {
          idStudent: 14,
          idGroup: 2,
          idSubject: 23,
          schoolYear: acaYear
        },
        {
          idStudent: 14,
          idGroup: 2,
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
          idGroup: 2,
          idSubject: 21,
          schoolYear: acaYear
        },
        {
          idStudent: 15,
          idGroup: 2,
          idSubject: 22,
          schoolYear: acaYear
        },
        {
          idStudent: 15,
          idGroup: 2,
          idSubject: 23,
          schoolYear: acaYear
        },
        {
          idStudent: 15,
          idGroup: 2,
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
          {
            idTeacher: 1,
            idSubject: 1,
            idGroup: 2,
            schoolYear: acaYear
          },
          {
            idTeacher: 1,
            idSubject: 2,
            idGroup: 2,
            schoolYear: acaYear
          },
          {
            idTeacher: 1,
            idSubject: 3,
            idGroup: 2,
            schoolYear: acaYear
          },
          {
            idTeacher: 1,
            idSubject: 4,
            idGroup: 2,
            schoolYear: acaYear
          },
          {
            idTeacher: 1,
            idSubject: 5,
            idGroup: 2,
            schoolYear: acaYear
          },
          {
            idTeacher: 1,
            idSubject: 6,
            idGroup: 2,
            schoolYear: acaYear
          },
          {
            idTeacher: 1,
            idSubject: 7,
            idGroup: 2,
            schoolYear: acaYear
          },
          {
            idTeacher: 1,
            idSubject: 8,
            idGroup: 2,
            schoolYear: acaYear
          },
          //DAW
          {
            idTeacher: 1,
            idSubject: 9,
            idGroup: 2,
            schoolYear: acaYear
          },
          {
            idTeacher: 1,
            idSubject: 10,
            idGroup: 2,
            schoolYear: acaYear
          },
          {
            idTeacher: 1,
            idSubject: 11,
            idGroup: 2,
            schoolYear: acaYear
          },
          {
            idTeacher: 1,
            idSubject: 12,
            idGroup: 2,
            schoolYear: acaYear
          },
          {
            idTeacher: 1,
            idSubject: 13,
            idGroup: 2,
            schoolYear: acaYear
          },
          {
            idTeacher: 1,
            idSubject: 14,
            idGroup: 2,
            schoolYear: acaYear
          },
          {
            idTeacher: 1,
            idSubject: 15,
            idGroup: 2,
            schoolYear: acaYear
          },
          {
            idTeacher: 1,
            idSubject: 16,
            idGroup: 2,
            schoolYear: acaYear
          }

        ]
      });

      const weekSchedule = await
      prisma.weekschedule.createMany({
        data: [
          //una clase por ejemplo 1 dam mañana
          //un lunes 
          {
            idTeacherAssignment: 1,
            diaSemana: 1,
            horaInicio: '8:15',
            horaFin: '9:15',
          },
          {
            idTeacherAssignment: 1,
            diaSemana: 1,
            horaInicio: '9:15',
            horaFin: '10:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 1,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 1,
            horaInicio: '11:45',
            horaFin: '12:45',
          },
          {
            idTeacherAssignment: 3,
            diaSemana: 1,
            horaInicio: '12:45',
            horaFin: '13:45',
          },
          {
            idTeacherAssignment: 3,
            diaSemana: 1,
            horaInicio: '13:45',
            horaFin: '14:45',
          },
          //un martes
          {
            idTeacherAssignment: 2,
            diaSemana: 2,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 2,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 2,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 2,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 2,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 2,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          //un miercoles
          {
            idTeacherAssignment: 2,
            diaSemana: 3,
            horaInicio: '8:15',
            horaFin: '9:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 3,
            horaInicio: '9:15',
            horaFin: '10:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 3,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 3,
            horaInicio: '11:45',
            horaFin: '12:45',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 3,
            horaInicio: '12:45',
            horaFin: '13:45',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 3,
            horaInicio: '13:45',
            horaFin: '14:45',
          },
          //un jueves
          {
            idTeacherAssignment: 2,
            diaSemana: 4,
            horaInicio: '8:15',
            horaFin: '9:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 4,
            horaInicio: '9:15',
            horaFin: '10:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 4,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 4,
            horaInicio: '11:45',
            horaFin: '12:45',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 4,
            horaInicio: '12:45',
            horaFin: '13:45',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 4,
            horaInicio: '13:45',
            horaFin: '14:45',
          },
          //un viernes
          {
            idTeacherAssignment: 2,
            diaSemana: 5,
            horaInicio: '8:15',
            horaFin: '9:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 5,
            horaInicio: '9:15',
            horaFin: '10:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 5,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 5,
            horaInicio: '11:45',
            horaFin: '12:45',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 5,
            horaInicio: '12:45',
            horaFin: '13:45',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 5,
            horaInicio: '13:45',
            horaFin: '14:45',
          },

          //ahora el horario de otra clase (por ejemplo 1 daw mañana)
          {
            idTeacherAssignment: 1,
            diaSemana: 1,
            horaInicio: '8:15',
            horaFin: '9:15',
          },
          {
            idTeacherAssignment: 1,
            diaSemana: 1,
            horaInicio: '9:15',
            horaFin: '10:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 1,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 1,
            horaInicio: '11:45',
            horaFin: '12:45',
          },
          {
            idTeacherAssignment: 3,
            diaSemana: 1,
            horaInicio: '12:45',
            horaFin: '13:45',
          },
          {
            idTeacherAssignment: 3,
            diaSemana: 1,
            horaInicio: '13:45',
            horaFin: '14:45',
          },
          //un martes
          {
            idTeacherAssignment: 2,
            diaSemana: 2,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 2,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 2,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 2,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 2,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 2,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          //un miercoles
          {
            idTeacherAssignment: 2,
            diaSemana: 3,
            horaInicio: '8:15',
            horaFin: '9:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 3,
            horaInicio: '9:15',
            horaFin: '10:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 3,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 3,
            horaInicio: '11:45',
            horaFin: '12:45',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 3,
            horaInicio: '12:45',
            horaFin: '13:45',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 3,
            horaInicio: '13:45',
            horaFin: '14:45',
          },
          //un jueves
          {
            idTeacherAssignment: 2,
            diaSemana: 4,
            horaInicio: '8:15',
            horaFin: '9:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 4,
            horaInicio: '9:15',
            horaFin: '10:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 4,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 4,
            horaInicio: '11:45',
            horaFin: '12:45',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 4,
            horaInicio: '12:45',
            horaFin: '13:45',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 4,
            horaInicio: '13:45',
            horaFin: '14:45',
          },
          //un viernes
          {
            idTeacherAssignment: 2,
            diaSemana: 5,
            horaInicio: '8:15',
            horaFin: '9:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 5,
            horaInicio: '9:15',
            horaFin: '10:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 5,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 5,
            horaInicio: '11:45',
            horaFin: '12:45',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 5,
            horaInicio: '12:45',
            horaFin: '13:45',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 5,
            horaInicio: '13:45',
            horaFin: '14:45',
          },
          //ahora el horario semanal que corresponderá a otra clase ejemplo(1 asir mañana)
          {
            idTeacherAssignment: 1,
            diaSemana: 1,
            horaInicio: '8:15',
            horaFin: '9:15',
          },
          {
            idTeacherAssignment: 1,
            diaSemana: 1,
            horaInicio: '9:15',
            horaFin: '10:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 1,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 1,
            horaInicio: '11:45',
            horaFin: '12:45',
          },
          {
            idTeacherAssignment: 3,
            diaSemana: 1,
            horaInicio: '12:45',
            horaFin: '13:45',
          },
          {
            idTeacherAssignment: 3,
            diaSemana: 1,
            horaInicio: '13:45',
            horaFin: '14:45',
          },
          //un martes
          {
            idTeacherAssignment: 2,
            diaSemana: 2,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 2,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 2,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 2,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 2,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 2,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          //un miercoles
          {
            idTeacherAssignment: 2,
            diaSemana: 3,
            horaInicio: '8:15',
            horaFin: '9:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 3,
            horaInicio: '9:15',
            horaFin: '10:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 3,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 3,
            horaInicio: '11:45',
            horaFin: '12:45',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 3,
            horaInicio: '12:45',
            horaFin: '13:45',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 3,
            horaInicio: '13:45',
            horaFin: '14:45',
          },
          //un jueves
          {
            idTeacherAssignment: 2,
            diaSemana: 4,
            horaInicio: '8:15',
            horaFin: '9:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 4,
            horaInicio: '9:15',
            horaFin: '10:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 4,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 4,
            horaInicio: '11:45',
            horaFin: '12:45',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 4,
            horaInicio: '12:45',
            horaFin: '13:45',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 4,
            horaInicio: '13:45',
            horaFin: '14:45',
          },
          //un viernes
          {
            idTeacherAssignment: 2,
            diaSemana: 5,
            horaInicio: '8:15',
            horaFin: '9:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 5,
            horaInicio: '9:15',
            horaFin: '10:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 5,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 5,
            horaInicio: '11:45',
            horaFin: '12:45',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 5,
            horaInicio: '12:45',
            horaFin: '13:45',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 5,
            horaInicio: '13:45',
            horaFin: '14:45',
          },
          //ahora el horario semanal que corresponderá a otra clase 1smr mañana
          {
            idTeacherAssignment: 1,
            diaSemana: 1,
            horaInicio: '8:15',
            horaFin: '9:15',
          },
          {
            idTeacherAssignment: 1,
            diaSemana: 1,
            horaInicio: '9:15',
            horaFin: '10:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 1,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 1,
            horaInicio: '11:45',
            horaFin: '12:45',
          },
          {
            idTeacherAssignment: 3,
            diaSemana: 1,
            horaInicio: '12:45',
            horaFin: '13:45',
          },
          {
            idTeacherAssignment: 3,
            diaSemana: 1,
            horaInicio: '13:45',
            horaFin: '14:45',
          },
          //un martes
          {
            idTeacherAssignment: 2,
            diaSemana: 2,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 2,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 2,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 2,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 2,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 2,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          //un miercoles
          {
            idTeacherAssignment: 2,
            diaSemana: 3,
            horaInicio: '8:15',
            horaFin: '9:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 3,
            horaInicio: '9:15',
            horaFin: '10:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 3,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 3,
            horaInicio: '11:45',
            horaFin: '12:45',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 3,
            horaInicio: '12:45',
            horaFin: '13:45',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 3,
            horaInicio: '13:45',
            horaFin: '14:45',
          },
          //un jueves
          {
            idTeacherAssignment: 2,
            diaSemana: 4,
            horaInicio: '8:15',
            horaFin: '9:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 4,
            horaInicio: '9:15',
            horaFin: '10:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 4,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 4,
            horaInicio: '11:45',
            horaFin: '12:45',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 4,
            horaInicio: '12:45',
            horaFin: '13:45',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 4,
            horaInicio: '13:45',
            horaFin: '14:45',
          },
          //un viernes
          {
            idTeacherAssignment: 2,
            diaSemana: 5,
            horaInicio: '8:15',
            horaFin: '9:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 5,
            horaInicio: '9:15',
            horaFin: '10:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 5,
            horaInicio: '10:15',
            horaFin: '11:15',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 5,
            horaInicio: '11:45',
            horaFin: '12:45',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 5,
            horaInicio: '12:45',
            horaFin: '13:45',
          },
          {
            idTeacherAssignment: 2,
            diaSemana: 5,
            horaInicio: '13:45',
            horaFin: '14:45',
          }
        ]
      });

      const classSession = await
      prisma.classSession.createMany({
        data: [
           // ========== SEMANA 1: 15-19 Septiembre 2025 ==========
    
    // === GRUPO 1 (1 DAM MAÑANA) - LUNES 15 Sept ===
    // Los primeros 6 registros del weekSchedule (idHorario 1-6) corresponden al lunes del grupo 1
    {
      fecha: '2025-09-15T08:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 1 // Lunes 8:15-9:15, idTeacherAssignment: 1
    },
    {
      fecha: '2025-09-15T09:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 2 // Lunes 9:15-10:15, idTeacherAssignment: 1
    },
    {
      fecha: '2025-09-15T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 3 // Lunes 10:15-11:15, idTeacherAssignment: 2
    },
    {
      fecha: '2025-09-15T11:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 4 // Lunes 11:45-12:45, idTeacherAssignment: 2
    },
    {
      fecha: '2025-09-15T12:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 5 // Lunes 12:45-13:45, idTeacherAssignment: 3
    },
    {
      fecha: '2025-09-15T13:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 6 // Lunes 13:45-14:45, idTeacherAssignment: 3
    },

    // === GRUPO 1 (1 DAM MAÑANA) - MARTES 16 Sept ===
    // idHorario 7-12
    {
      fecha: '2025-09-16T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 7
    },
    {
      fecha: '2025-09-16T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 8
    },
    {
      fecha: '2025-09-16T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 9
    },
    {
      fecha: '2025-09-16T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 10
    },
    {
      fecha: '2025-09-16T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 11
    },
    {
      fecha: '2025-09-16T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 12
    },

    // === GRUPO 1 (1 DAM MAÑANA) - MIÉRCOLES 17 Sept ===
    // idHorario 13-18
    {
      fecha: '2025-09-17T08:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 13
    },
    {
      fecha: '2025-09-17T09:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 14
    },
    {
      fecha: '2025-09-17T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 15
    },
    {
      fecha: '2025-09-17T11:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 16
    },
    {
      fecha: '2025-09-17T12:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 17
    },
    {
      fecha: '2025-09-17T13:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 18
    },

    // === GRUPO 1 (1 DAM MAÑANA) - JUEVES 18 Sept ===
    // idHorario 19-24
    {
      fecha: '2025-09-18T08:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 19
    },
    {
      fecha: '2025-09-18T09:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 20
    },
    {
      fecha: '2025-09-18T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 21
    },
    {
      fecha: '2025-09-18T11:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 22
    },
    {
      fecha: '2025-09-18T12:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 23
    },
    {
      fecha: '2025-09-18T13:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 24
    },

    // === GRUPO 1 (1 DAM MAÑANA) - VIERNES 19 Sept ===
    // idHorario 25-30
    {
      fecha: '2025-09-19T08:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 25
    },
    {
      fecha: '2025-09-19T09:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 26
    },
    {
      fecha: '2025-09-19T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 27
    },
    {
      fecha: '2025-09-19T11:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 28
    },
    {
      fecha: '2025-09-19T12:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 29
    },
    {
      fecha: '2025-09-19T13:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 30
    },

    // === GRUPO 2 (1 DAW MAÑANA) - LUNES 15 Sept ===
    // idHorario 31-36
    {
      fecha: '2025-09-15T08:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 31
    },
    {
      fecha: '2025-09-15T09:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 32
    },
    {
      fecha: '2025-09-15T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 33
    },
    {
      fecha: '2025-09-15T11:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 34
    },
    {
      fecha: '2025-09-15T12:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 35
    },
    {
      fecha: '2025-09-15T13:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 36
    },

    // === GRUPO 2 (1 DAW MAÑANA) - MARTES 16 Sept ===
    // idHorario 37-42
    {
      fecha: '2025-09-16T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 37
    },
    {
      fecha: '2025-09-16T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 38
    },
    {
      fecha: '2025-09-16T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 39
    },
    {
      fecha: '2025-09-16T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 40
    },
    {
      fecha: '2025-09-16T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 41
    },
    {
      fecha: '2025-09-16T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 42
    },

    // === GRUPO 2 (1 DAW MAÑANA) - MIÉRCOLES 17 Sept ===
    // idHorario 43-48
    {
      fecha: '2025-09-17T08:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 43
    },
    {
      fecha: '2025-09-17T09:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 44
    },
    {
      fecha: '2025-09-17T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 45
    },
    {
      fecha: '2025-09-17T11:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 46
    },
    {
      fecha: '2025-09-17T12:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 47
    },
    {
      fecha: '2025-09-17T13:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 48
    },

    // === GRUPO 2 (1 DAW MAÑANA) - JUEVES 18 Sept ===
    // idHorario 49-54
    {
      fecha: '2025-09-18T08:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 49
    },
    {
      fecha: '2025-09-18T09:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 50
    },
    {
      fecha: '2025-09-18T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 51
    },
    {
      fecha: '2025-09-18T11:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 52
    },
    {
      fecha: '2025-09-18T12:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 53
    },
    {
      fecha: '2025-09-18T13:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 54
    },

    // === GRUPO 2 (1 DAW MAÑANA) - VIERNES 19 Sept ===
    // idHorario 55-60
    {
      fecha: '2025-09-19T08:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 55
    },
    {
      fecha: '2025-09-19T09:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 56
    },
    {
      fecha: '2025-09-19T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 57
    },
    {
      fecha: '2025-09-19T11:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 58
    },
    {
      fecha: '2025-09-19T12:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 59
    },
    {
      fecha: '2025-09-19T13:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 60
    },

    // === GRUPO 3 (1 ASIR MAÑANA) - LUNES 15 Sept ===
    // idHorario 61-66
    {
      fecha: '2025-09-15T08:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 61
    },
    {
      fecha: '2025-09-15T09:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 62
    },
    {
      fecha: '2025-09-15T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 63
    },
    {
      fecha: '2025-09-15T11:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 64
    },
    {
      fecha: '2025-09-15T12:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 65
    },
    {
      fecha: '2025-09-15T13:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 66
    },

    // === GRUPO 3 (1 ASIR MAÑANA) - MARTES 16 Sept ===
    // idHorario 67-72
    {
      fecha: '2025-09-16T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 67
    },
    {
      fecha: '2025-09-16T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 68
    },
    {
      fecha: '2025-09-16T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 69
    },
    {
      fecha: '2025-09-16T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 70
    },
    {
      fecha: '2025-09-16T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 71
    },
    {
      fecha: '2025-09-16T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 72
    },

    // === GRUPO 3 (1 ASIR MAÑANA) - MIÉRCOLES 17 Sept ===
    // idHorario 73-78
    {
      fecha: '2025-09-17T08:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 73
    },
    {
      fecha: '2025-09-17T09:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 74
    },
    {
      fecha: '2025-09-17T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 75
    },
    {
      fecha: '2025-09-17T11:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 76
    },
    {
      fecha: '2025-09-17T12:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 77
    },
    {
      fecha: '2025-09-17T13:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 78
    },

    // === GRUPO 3 (1 ASIR MAÑANA) - JUEVES 18 Sept ===
    // idHorario 79-84
    {
      fecha: '2025-09-18T08:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 79
    },
    {
      fecha: '2025-09-18T09:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 80
    },
    {
      fecha: '2025-09-18T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 81
    },
    {
      fecha: '2025-09-18T11:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 82
    },
    {
      fecha: '2025-09-18T12:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 83
    },
    {
      fecha: '2025-09-18T13:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 84
    },

    // === GRUPO 3 (1 ASIR MAÑANA) - VIERNES 19 Sept ===
    // idHorario 85-90
    {
      fecha: '2025-09-19T08:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 85
    },
    {
      fecha: '2025-09-19T09:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 86
    },
    {
      fecha: '2025-09-19T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 87
    },
    {
      fecha: '2025-09-19T11:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 88
    },
    {
      fecha: '2025-09-19T12:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 89
    },
    {
      fecha: '2025-09-19T13:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 90
    },

    // === GRUPO 4 (1 SMR MAÑANA) - LUNES 15 Sept ===
    // idHorario 91-96
    {
      fecha: '2025-09-15T08:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 91
    },
    {
      fecha: '2025-09-15T09:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 92
    },
    {
      fecha: '2025-09-15T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 93
    },
    {
      fecha: '2025-09-15T11:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 94
    },
    {
      fecha: '2025-09-15T12:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 95
    },
    {
      fecha: '2025-09-15T13:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 96
    },

    // === GRUPO 4 (1 SMR MAÑANA) - MARTES 16 Sept ===
    // idHorario 97-102
    {
      fecha: '2025-09-16T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 97
    },
    {
      fecha: '2025-09-16T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 98
    },
    {
      fecha: '2025-09-16T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 99
    },
    {
      fecha: '2025-09-16T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 100
    },
    {
      fecha: '2025-09-16T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 101
    },
    {
      fecha: '2025-09-16T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 102
    },

    // === GRUPO 4 (1 SMR MAÑANA) - MIÉRCOLES 17 Sept ===
    // idHorario 103-108
    {
      fecha: '2025-09-17T08:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 103
    },
    {
      fecha: '2025-09-17T09:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 104
    },
    {
      fecha: '2025-09-17T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 105
    },
    {
      fecha: '2025-09-17T11:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 106
    },
    {
      fecha: '2025-09-17T12:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 107
    },
    {
      fecha: '2025-09-17T13:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 108
    },

    // === GRUPO 4 (1 SMR MAÑANA) - JUEVES 18 Sept ===
    // idHorario 109-114
    {
      fecha: '2025-09-18T08:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 109
    },
    {
      fecha: '2025-09-18T09:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 110
    },
    {
      fecha: '2025-09-18T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 111
    },
    {
      fecha: '2025-09-18T11:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 112
    },
    {
      fecha: '2025-09-18T12:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 113
    },
    {
      fecha: '2025-09-18T13:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 114
    },

    // === GRUPO 4 (1 SMR MAÑANA) - VIERNES 19 Sept ===
    // idHorario 115-120
    {
      fecha: '2025-09-19T08:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 115
    },
    {
      fecha: '2025-09-19T09:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 116
    },
    {
      fecha: '2025-09-19T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 117
    },
    {
      fecha: '2025-09-19T11:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 118
    },
    {
      fecha: '2025-09-19T12:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 119
    },
    {
      fecha: '2025-09-19T13:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 120
    },

    // ========== SEMANA 2: 22-26 Septiembre 2025 ==========
    
    // === GRUPO 1 (1 DAM MAÑANA) - LUNES 22 Sept ===
    {
      fecha: '2025-09-22T08:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 1
    },
    {
      fecha: '2025-09-22T09:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 2
    },
    {
      fecha: '2025-09-22T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 3
    },
    {
      fecha: '2025-09-22T11:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 4
    },
    {
      fecha: '2025-09-22T12:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 5
    },
    {
      fecha: '2025-09-22T13:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 6
    },

    // === GRUPO 1 (1 DAM MAÑANA) - MARTES 23 Sept ===
    {
      fecha: '2025-09-23T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 7
    },
    {
      fecha: '2025-09-23T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 8
    },
    {
      fecha: '2025-09-23T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 9
    },
    {
      fecha: '2025-09-23T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 10
    },
    {
      fecha: '2025-09-23T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 11
    },
    {
      fecha: '2025-09-23T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 12
    },

    // === GRUPO 1 (1 DAM MAÑANA) - MIÉRCOLES 24 Sept ===
    {
      fecha: '2025-09-24T08:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 13
    },
    {
      fecha: '2025-09-24T09:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 14
    },
    {
      fecha: '2025-09-24T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 15
    },
    {
      fecha: '2025-09-24T11:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 16
    },
    {
      fecha: '2025-09-24T12:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 17
    },
    {
      fecha: '2025-09-24T13:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 18
    },

    // === GRUPO 1 (1 DAM MAÑANA) - JUEVES 25 Sept ===
    {
      fecha: '2025-09-25T08:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 19
    },
    {
      fecha: '2025-09-25T09:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 20
    },
    {
      fecha: '2025-09-25T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 21
    },
    {
      fecha: '2025-09-25T11:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 22
    },
    {
      fecha: '2025-09-25T12:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 23
    },
    {
      fecha: '2025-09-25T13:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 24
    },

    // === GRUPO 1 (1 DAM MAÑANA) - VIERNES 26 Sept ===
    {
      fecha: '2025-09-26T08:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 25
    },
    {
      fecha: '2025-09-26T09:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 26
    },
    {
      fecha: '2025-09-26T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 27
    },
    {
      fecha: '2025-09-26T11:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 28
    },
    {
      fecha: '2025-09-26T12:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 29
    },
    {
      fecha: '2025-09-26T13:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 30
    },

    // === GRUPO 2 (1 DAW MAÑANA) - LUNES 22 Sept ===
    {
      fecha: '2025-09-22T08:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 31
    },
    {
      fecha: '2025-09-22T09:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 32
    },
    {
      fecha: '2025-09-22T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 33
    },
    {
      fecha: '2025-09-22T11:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 34
    },
    {
      fecha: '2025-09-22T12:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 35
    },
    {
      fecha: '2025-09-22T13:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 36
    },

    // === GRUPO 2 (1 DAW MAÑANA) - MARTES 23 Sept ===
    {
      fecha: '2025-09-23T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 37
    },
    {
      fecha: '2025-09-23T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 38
    },
    {
      fecha: '2025-09-23T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 39
    },
    {
      fecha: '2025-09-23T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 40
    },
    {
      fecha: '2025-09-23T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 41
    },
    {
      fecha: '2025-09-23T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 42
    },

    // === GRUPO 2 (1 DAW MAÑANA) - MIÉRCOLES 24 Sept ===
    {
      fecha: '2025-09-24T08:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 43
    },
    {
      fecha: '2025-09-24T09:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 44
    },
    {
      fecha: '2025-09-24T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 45
    },
    {
      fecha: '2025-09-24T11:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 46
    },
    {
      fecha: '2025-09-24T12:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 47
    },
    {
      fecha: '2025-09-24T13:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 48
    },

    // === GRUPO 2 (1 DAW MAÑANA) - JUEVES 25 Sept ===
    {
      fecha: '2025-09-25T08:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 49
    },
    {
      fecha: '2025-09-25T09:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 50
    },
    {
      fecha: '2025-09-25T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 51
    },
    {
      fecha: '2025-09-25T11:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 52
    },
    {
      fecha: '2025-09-25T12:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 53
    },
    {
      fecha: '2025-09-25T13:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 54
    },

    // === GRUPO 2 (1 DAW MAÑANA) - VIERNES 26 Sept ===
    {
      fecha: '2025-09-26T08:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 55
    },
    {
      fecha: '2025-09-26T09:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 56
    },
    {
      fecha: '2025-09-26T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 57
    },
    {
      fecha: '2025-09-26T11:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 58
    },
    {
      fecha: '2025-09-26T12:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 59
    },
    {
      fecha: '2025-09-26T13:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 60
    },

    // === GRUPO 3 (1 ASIR MAÑANA) - LUNES 22 Sept ===
    {
      fecha: '2025-09-22T08:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 61
    },
    {
      fecha: '2025-09-22T09:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 62
    },
    {
      fecha: '2025-09-22T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 63
    },
    {
      fecha: '2025-09-22T11:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 64
    },
    {
      fecha: '2025-09-22T12:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 65
    },
    {
      fecha: '2025-09-22T13:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 66
    },

    // === GRUPO 3 (1 ASIR MAÑANA) - MARTES 23 Sept ===
    {
      fecha: '2025-09-23T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 67
    },
    {
      fecha: '2025-09-23T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 68
    },
    {
      fecha: '2025-09-23T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 69
    },
    {
      fecha: '2025-09-23T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 70
    },
    {
      fecha: '2025-09-23T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 71
    },
    {
      fecha: '2025-09-23T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 72
    },

    // === GRUPO 3 (1 ASIR MAÑANA) - MIÉRCOLES 24 Sept ===
    {
      fecha: '2025-09-24T08:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 73
    },
    {
      fecha: '2025-09-24T09:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 74
    },
    {
      fecha: '2025-09-24T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 75
    },
    {
      fecha: '2025-09-24T11:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 76
    },
    {
      fecha: '2025-09-24T12:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 77
    },
    {
      fecha: '2025-09-24T13:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 78
    },

    // === GRUPO 3 (1 ASIR MAÑANA) - JUEVES 25 Sept ===
    {
      fecha: '2025-09-25T08:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 79
    },
    {
      fecha: '2025-09-25T09:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 80
    },
    {
      fecha: '2025-09-25T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 81
    },
    {
      fecha: '2025-09-25T11:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 82
    },
    {
      fecha: '2025-09-25T12:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 83
    },
    {
      fecha: '2025-09-25T13:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 84
    },

    // === GRUPO 3 (1 ASIR MAÑANA) - VIERNES 26 Sept ===
    {
      fecha: '2025-09-26T08:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 85
    },
    {
      fecha: '2025-09-26T09:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 86
    },
    {
      fecha: '2025-09-26T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 87
    },
    {
      fecha: '2025-09-26T11:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 88
    },
    {
      fecha: '2025-09-26T12:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 89
    },
    {
      fecha: '2025-09-26T13:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 90
    },

    // === GRUPO 4 (1 SMR MAÑANA) - LUNES 22 Sept ===
    {
      fecha: '2025-09-22T08:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 91
    },
    {
      fecha: '2025-09-22T09:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 92
    },
    {
      fecha: '2025-09-22T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 93
    },
    {
      fecha: '2025-09-22T11:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 94
    },
    {
      fecha: '2025-09-22T12:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 95
    },
    {
      fecha: '2025-09-22T13:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 96
    },

    // === GRUPO 4 (1 SMR MAÑANA) - MARTES 23 Sept ===
    {
      fecha: '2025-09-23T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 97
    },
    {
      fecha: '2025-09-23T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 98
    },
    {
      fecha: '2025-09-23T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 99
    },
    {
      fecha: '2025-09-23T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 100
    },
    {
      fecha: '2025-09-23T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 101
    },
    {
      fecha: '2025-09-23T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 102
    },

    // === GRUPO 4 (1 SMR MAÑANA) - MIÉRCOLES 24 Sept ===
    {
      fecha: '2025-09-24T08:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 103
    },
    {
      fecha: '2025-09-24T09:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 104
    },
    {
      fecha: '2025-09-24T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 105
    },
    {
      fecha: '2025-09-24T11:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 106
    },
    {
      fecha: '2025-09-24T12:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 107
    },
    {
      fecha: '2025-09-24T13:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 108
    },

    // === GRUPO 4 (1 SMR MAÑANA) - JUEVES 25 Sept ===
    {
      fecha: '2025-09-25T08:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 109
    },
    {
      fecha: '2025-09-25T09:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 110
    },
    {
      fecha: '2025-09-25T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 111
    },
    {
      fecha: '2025-09-25T11:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 112
    },
    {
      fecha: '2025-09-25T12:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 113
    },
    {
      fecha: '2025-09-25T13:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 114
    },

    // === GRUPO 4 (1 SMR MAÑANA) - VIERNES 26 Sept ===
    {
      fecha: '2025-09-26T08:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 115
    },
    {
      fecha: '2025-09-26T09:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 116
    },
    {
      fecha: '2025-09-26T10:15:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 117
    },
    {
      fecha: '2025-09-26T11:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 118
    },
    {
      fecha: '2025-09-26T12:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 119
    },
    {
      fecha: '2025-09-26T13:45:00.000Z',
      estado: 'PROGRAMADA',
      observaciones: '',
      idHorario: 120
    }
          
        ]
      });

      const assistance = await
      prisma.assistance.createMany({
        data:[
          {
            estado: 'PRESENTE',//ENUM
            idSesion: 0,
            idStudentEnrollment:0
          }
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

  
}

  main()
    .catch((e) => {
      console.error('❌ Error durante el seed:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });