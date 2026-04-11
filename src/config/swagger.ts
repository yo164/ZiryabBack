import swaggerJsdoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { env } from './env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Express + PostgreSQL',
      version: '1.0.0',
      description: 'API REST con autenticación JWT, validación Zod, rate limiting y testing completo',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
        description: 'Servidor de desarrollo',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID del usuario',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email del usuario',
            },
            name: {
              type: 'string',
              description: 'Nombre del usuario',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
            },
          },
        },
        RegisterInput: {
          type: 'object',
          required: ['email', 'name', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Email del usuario',
            },
            name: {
              type: 'string',
              minLength: 2,
              description: 'Nombre del usuario',
            },
            password: {
              type: 'string',
              minLength: 8,
              description: 'Contraseña del usuario',
            },
          },
        },
        LoginInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
            },
            password: {
              type: 'string',
              minLength: 8,
            },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            user: {
              $ref: '#/components/schemas/User',
            },
            token: {
              type: 'string',
              description: 'JWT token',
            },
          },
        },
        UpdateProfileInput: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
            },
            name: {
              type: 'string',
              minLength: 2,
            },
          },
        },
        ChangePasswordInput: {
          type: 'object',
          required: ['currentPassword', 'newPassword'],
          properties: {
            currentPassword: {
              type: 'string',
            },
            newPassword: {
              type: 'string',
              minLength: 8,
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
          },
        },
        Task: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1, description: 'ID de la tarea' },
            userId: { type: 'integer', example: 10, description: 'ID del usuario propietario' },
            title: { type: 'string', example: 'Estudiar para examen', description: 'Título de la tarea' },
            done: { type: 'boolean', example: false, description: '¿Está completada?' },
            createdAt: { type: 'string', format: 'date-time', example: '2025-11-13T18:39:33.952Z', description: 'Fecha de creación' }
          }
        },
        CreateTask: {
          type: 'object',
          required: ['title'],
          properties: {
            title: { type: 'string', example: 'Preparar presentación' }
          }
        },
        UpdateTask: {
          type: 'object',
          properties: {
            title: { type: 'string', example: 'Preparar demo' },
            done: { type: 'boolean', example: true }
          }
        },
        Assistance: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1, description: 'ID de la asistencia' },
            idSession: { type: 'integer', example: 5, description: 'ID de la sesión de clase' },
            idStudentEnrollment: { type: 'integer', example: 10, description: 'ID de la matrícula del estudiante' },
            status: { type: 'string', enum: ['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'], example: 'PRESENT', description: 'Estado de asistencia' },
            justificationUri: { type: 'string', nullable: true, example: '/uploads/justifications/file.pdf', description: 'URL del justificante (opcional)' },
            justificationStatus: { type: 'string', enum: ['PENDING', 'VIEWED', 'REJECTED'], nullable: true, example: 'PENDING', description: 'Estado del justificante (opcional)' },
            createdAt: { type: 'string', format: 'date-time', example: '2025-11-13T18:39:33.952Z' }
          }
        },
        CreateAssistance: {
          type: 'object',
          required: ['idSession', 'idStudentEnrollment'],
          properties: {
            idSession: { type: 'integer', example: 5 },
            idStudentEnrollment: { type: 'integer', example: 10 },
            status: { type: 'string', enum: ['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'], example: 'PRESENT' }
          }
        },
        UpdateAssistanceStatus: {
          type: 'object',
          required: ['status'],
          properties: {
            status: { type: 'string', enum: ['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'], example: 'LATE' }
          }
        },
      },
    },
    tags: [
      {
        name: 'Auth',
        description: 'Endpoints de autenticación',
      },
      {
        name: 'Users',
        description: 'Gestión de usuarios',
      },
      {
        name: 'Tasks',
        description: 'Gestión de tareas personales del usuario'
      },
      {
        name: 'Assistances',
        description: 'Gestión de asistencias de los alumnos'
      },

    ],

  },
  apis: [join(__dirname, '../modules/**/*.routes.js')],
};

export const swaggerSpec = swaggerJsdoc(options);

