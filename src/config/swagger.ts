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
            idTeacherAssignment: { type: 'integer', example: 10, description: 'ID de la asignación del profesor' },
            title: { type: 'string', example: 'Práctica 1', description: 'Título de la tarea' },
            description: { type: 'string', nullable: true, example: 'Resolver ejercicios del 1 al 10', description: 'Descripción detallada' },
            type: { type: 'string', enum: ['PRACTICE', 'THEORY', 'EXAM', 'PROJECT', 'HOMEWORK'], example: 'PRACTICE' },
            startDate: { type: 'string', format: 'date-time', example: '2025-11-13T18:39:33.952Z' },
            dueDate: { type: 'string', format: 'date-time', example: '2025-11-20T23:59:59.999Z' },
            attachmentUrl: { type: 'string', nullable: true, example: '/uploads/tasks/document.pdf' },
            schoolYear: { type: 'string', example: '2024-2025' },
            createdAt: { type: 'string', format: 'date-time', example: '2025-11-13T18:39:33.952Z' }
          }
        },
        CreateTask: {
          type: 'object',
          required: ['idTeacherAssignment', 'title', 'type', 'startDate', 'dueDate', 'schoolYear'],
          properties: {
            idTeacherAssignment: { type: 'integer', example: 10 },
            title: { type: 'string', example: 'Práctica 1' },
            description: { type: 'string', example: 'Resolver ejercicios' },
            type: { type: 'string', enum: ['PRACTICE', 'THEORY', 'EXAM', 'PROJECT', 'HOMEWORK'], example: 'PRACTICE' },
            startDate: { type: 'string', format: 'date-time' },
            dueDate: { type: 'string', format: 'date-time' },
            schoolYear: { type: 'string', example: '2024-2025' }
          }
        },
        UpdateTask: {
          type: 'object',
          properties: {
            title: { type: 'string', example: 'Práctica 1 Modificada' },
            description: { type: 'string', example: 'Resolver ejercicios extra' },
            dueDate: { type: 'string', format: 'date-time' }
          }
        },
        StudentTask: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            idTask: { type: 'integer', example: 5 },
            idStudentEnrollment: { type: 'integer', example: 12 },
            status: { type: 'string', enum: ['PENDING', 'SUBMITTED', 'LATE', 'GRADED', 'NOT_SUBMITTED'], example: 'PENDING' },
            submissionDate: { type: 'string', format: 'date-time', nullable: true },
            score: { type: 'number', nullable: true, example: 8.5 },
            feedback: { type: 'string', nullable: true, example: 'Buen trabajo' },
            attachmentUrl: { type: 'string', nullable: true },
            createdAt: { type: 'string', format: 'date-time' }
          }
        },
        UpdateStudentTask: {
          type: 'object',
          properties: {
            status: { type: 'string', enum: ['PENDING', 'SUBMITTED', 'LATE', 'GRADED', 'NOT_SUBMITTED'] },
            score: { type: 'number', example: 9.0 },
            feedback: { type: 'string', example: 'Excelente!' }
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
        IssueAudience: {
          type: 'string',
          enum: [
            'CENTER',
            'ALL_TEACHERS',
            'ALL_STUDENTS',
            'GROUP',
            'COURSE',
            'SUBJECT_GROUP',
            'TEACHER',
            'STUDENT',
          ],
          example: 'ALL_STUDENTS',
        },
        Issue: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            idAdmin: { type: 'integer', example: 1 },
            admin: { type: 'object' },
            audience: { $ref: '#/components/schemas/IssueAudience' },
            idGroup: { type: 'integer', nullable: true, example: 1 },
            idCourse: { type: 'integer', nullable: true, example: 1 },
            idSubject: { type: 'integer', nullable: true, example: 3 },
            grade: { type: 'string', nullable: true, enum: ['1', '2'], example: '1' },
            idTargetTeacher: { type: 'integer', nullable: true, example: 2 },
            idTargetStudent: { type: 'integer', nullable: true, example: 10 },
            title: { type: 'string', example: 'Bienvenida al curso 2024-2025' },
            body: { type: 'string', example: 'Recordad revisar el tablón de anuncios cada semana.' },
            attachmentUrl: { type: 'string', nullable: true },
            isPublished: { type: 'boolean', example: true },
            publishAt: { type: 'string', format: 'date-time', nullable: true },
            expiresAt: { type: 'string', format: 'date-time', nullable: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        CreateIssueInput: {
          type: 'object',
          required: ['audience', 'title', 'body'],
          properties: {
            audience: { $ref: '#/components/schemas/IssueAudience' },
            title: { type: 'string', example: 'Aviso importante' },
            body: { type: 'string', example: 'Contenido del anuncio para el tablón.' },
            attachmentUrl: { type: 'string', example: '/uploads/issues/aviso.pdf' },
            idGroup: { type: 'integer', description: 'Grupo (audiencia GROUP o SUBJECT_GROUP)', example: 1 },
            idCourse: {
              type: 'integer',
              description: 'Ciclo formativo DAM/DAW… (audiencia COURSE). No confundir con grade.',
              example: 1,
            },
            idSubject: {
              type: 'integer',
              description: 'Asignatura concreta; incluye ciclo y curso 1º/2º en Subject (SUBJECT_GROUP)',
              example: 3,
            },
            grade: {
              type: 'string',
              enum: ['1', '2'],
              description: 'Curso dentro del ciclo (1º o 2º). Solo audiencia COURSE junto a idCourse.',
              example: '1',
            },
            idTargetTeacher: { type: 'integer', example: 2 },
            idTargetStudent: { type: 'integer', example: 10 },
            idTeacher: {
              type: 'integer',
              description: 'Alias de idTargetTeacher (compatibilidad front)',
              example: 2,
            },
            isPublished: { type: 'boolean', example: false },
            publishAt: { type: 'string', format: 'date-time' },
            expiresAt: { type: 'string', format: 'date-time' },
          },
        },
        ApiSuccessIssue: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            data: { $ref: '#/components/schemas/Issue' },
          },
        },
        ApiSuccessIssueList: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            data: { type: 'array', items: { $ref: '#/components/schemas/Issue' } },
            count: { type: 'integer', example: 3 },
          },
        },
        ApiErrorIssue: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string', example: 'Cuerpo inválido' },
            errors: { type: 'object' },
          },
        },
        SubjectEvaluation: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 12 },
            idStudentEnrollment: { type: 'integer', example: 44 },
            period: {
              type: 'string',
              enum: ['INITIAL', 'FIRST_TRIMESTER', 'SECOND_TRIMESTER', 'THIRD_TRIMESTER', 'FINAL'],
              example: 'FIRST_TRIMESTER',
            },
            value: { type: 'integer', nullable: true, example: 8 },
            observations: { type: 'string', nullable: true, example: 'Buen progreso' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        CreateSubjectEvaluationInput: {
          type: 'object',
          required: ['idStudentEnrollment', 'period'],
          properties: {
            idStudentEnrollment: { type: 'integer', example: 44 },
            period: {
              type: 'string',
              enum: ['INITIAL', 'FIRST_TRIMESTER', 'SECOND_TRIMESTER', 'THIRD_TRIMESTER', 'FINAL'],
              example: 'FIRST_TRIMESTER',
            },
            value: { type: 'integer', minimum: 1, maximum: 10, example: 8 },
            observations: { type: 'string', nullable: true, example: 'Puede mejorar la entrega' },
          },
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
      {
        name: 'Assignments',
        description: 'Asignaciones profesor-asignatura-grupo',
      },
      {
        name: 'Courses',
        description: 'Ciclos formativos y asignaturas por grade',
      },
      {
        name: 'Issues',
        description: 'Tablón de anuncios (audiencia por rol, grupo o ciclo)',
      },
      {
        name: 'Subject Evaluations',
        description: 'Evaluaciones por periodo sobre matrículas de alumnos',
      },

    ],
  },
  apis: [join(__dirname, '../modules/**/*.routes.js')],
};

export const swaggerSpec = swaggerJsdoc(options);

