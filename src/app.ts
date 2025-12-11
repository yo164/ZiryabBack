import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from './middleware/error.js';
import { generalLimiter } from './middleware/rateLimiter.js';
import { requestLogger } from './middleware/requestLogger.js';
import { env } from './config/env.js';
import { swaggerSpec } from './config/swagger.js';
// import authRoutes from './modules/auth/auth.routes.js'; // Comentado para pruebas
import studentsRoutes from './modules/students/students.routes.js';
import subjectsRoutes from './modules/subjects/subjects.routes.js';
import courseRouter from './modules/course/course.routes.js';
import groupRouter from './modules/group/group.routes.js';

const app = express();

app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(requestLogger);

if (env.NODE_ENV !== 'test') {
  app.use(generalLimiter);
}

// Ruta de health check
app.get('/health', (_req, res) => res.json({ ok: true }));

// Ruta principal con info de endpoints
app.get('/', (_req, res) => {
  res.json({
    message: '🎓 API Escolar - Bienvenido',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      docs: '/api-docs',
      students: '/api/students',
      subjects: '/api/subjects',
      tasks: '/api/tasks',
    },
  });
});

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas de la API
app.use('/api/students', studentsRoutes);
app.use('/api/subjects', subjectsRoutes);
app.use('/api/courses', courseRouter);
app.use('/api/groups', groupRouter);

// Rutas de auth comentadas para pruebas
// app.use('/api/auth', authRoutes);

app.use(errorHandler);

export default app;