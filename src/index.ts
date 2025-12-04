import app from './app.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';
import prisma from './config/prisma.js';

prisma.$connect()
  .then(() => {
    logger.info('✅ Conectado a la base de datos');
    
    const server = app.listen(env.PORT, () => {
      logger.info(`🚀 API escuchando en http://localhost:${env.PORT}`);
      logger.info(`📚 Entorno: ${env.NODE_ENV}`);
      logger.info(`📖 Documentación: http://localhost:${env.PORT}/api-docs`);
    });

    process.on('SIGTERM', async () => {
      logger.info('SIGTERM recibido, cerrando servidor...');
      await prisma.$disconnect();
      server.close(() => {
        logger.info('Servidor cerrado');
        process.exit(0);
      });
    });

    process.on('SIGINT', async () => {
      logger.info('SIGINT recibido, cerrando servidor...');
      await prisma.$disconnect();
      server.close(() => {
        logger.info('Servidor cerrado');
        process.exit(0);
      });
    });
  })
  .catch((error) => {
    logger.error('❌ Error al conectar a la base de datos:', error);
    process.exit(1);
  });