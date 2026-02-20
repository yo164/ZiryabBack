import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from './middleware/error.js';
import { generalLimiter } from './middleware/rateLimiter.js';
import { requestLogger } from './middleware/requestLogger.js';
import { env } from './config/env.js';
import { swaggerSpec } from './config/swagger.js';
import authRoutes from './modules/auth/auth.routes.js';
import studentsRoutes from './modules/students/students.routes.js';
import subjectsRoutes from './modules/subjects/subjects.routes.js';
import teachersRoutes from './modules/teachers/teachers.routes.js';
import adminsRoutes from './modules/admin/admins.routes.js';
import enrollmentRoutes from './modules/enrollments/enrollments.routes.js';
import horariosRoutes from './modules/weekSchedule/weekSchedule.routes.js';
import classSesionRoutes from './modules/classSession/classSession.routes.js'
import taskRoutes from './modules/task/task.routes.js';
import studentTaskRoutes from './modules/student-task/student-task.routes.js';



import courseRouter from './modules/course/course.routes.js';
import groupRouter from './modules/group/group.routes.js';
import studentregsitrationRouter from './modules/student-registration/student-registration.routes.js'
//SACO UNA RAMA PARA IR HACIENDO PEQUEÑOS CAMBIOS EN LA BASE DE DATOS DE CARA A LA FUTURA ASIGNACIÓN DE UN PROFESOR A UNA ASIGNATURA IMPARTIDA EN UN GRUPO
const app = express();

app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(cors({
  origin: 'http://localhost:4200', // Tu frontend Angular
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}));
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
app.use('/api/teachers', teachersRoutes);
app.use('/api/admins', adminsRoutes);

app.use('/api/courses', courseRouter);
app.use('/api/groups', groupRouter);
app.use('/api/auth', authRoutes);
app.use('/api/studentregistration', studentregsitrationRouter);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/horarios-semanales', horariosRoutes);
app.use('/api/sessions', classSesionRoutes);


app.use('/api/tasks', taskRoutes);


app.use('/api/student-tasks', studentTaskRoutes);



/*
**URLs para probar en Bruno:**
GET http://localhost:3000/api/tasks
GET http://localhost:3000/api/tasks/1
GET http://localhost:3000/api/tasks/teacher-assignment/1
*/





/*
**URLs para probar en Bruno:**

GET http://localhost:3000/api/student-tasks
GET http://localhost:3000/api/student-tasks/1
GET http://localhost:3000/api/student-tasks/task/1
GET http://localhost:3000/api/student-tasks/student/1
*/
// Rutas de auth comentadas para pruebas
// app.use('/api/auth', authRoutes);

app.use(errorHandler);

export default app;