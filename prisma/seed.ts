

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('--- EJECUCIÓN DE SEEDER JS INICIADA ---');

  try {
    // Asegúrate de que los campos 'email', 'name', 'passwordHash' existan en tu schema.prisma
    const user = {
      email: 'elsa@prisma.io2',
      name: 'Elsa pato',
      passwordHash: 'Un_pasword_hash2'
    };

    const createUser = await prisma.user.create({ data: user });
    
    if (createUser) {
      console.log(`Usuario creado correctamente: ${user.name} (${user.email})`);
    } else {
      console.log('Algo falló en la creación.');
    }

  } catch (error) {
    console.error('ERROR CAPTURADO DURANTE LA SIEMBRA:', error);
  }
}

// Ejecuta la función principal
main()
  .catch((e) => {
    console.error('Error fatal al ejecutar main():', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('--- SEEDER FINALIZADO ---');
  });
