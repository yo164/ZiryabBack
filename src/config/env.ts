import { z } from 'zod';
import dotenv from 'dotenv';

// ✅ IMPORTANTE: Cargar las variables de entorno ANTES de parsear
dotenv.config();

// Define el esquema con Zod
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url('DATABASE_URL debe ser una URL válida'),
  
  // JWT
  JWT_SECRET: z.string().min(32, 'JWT_SECRET debe tener al menos 32 caracteres'),
  JWT_EXPIRY: z.string().default('7d'),
  
  // Node
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  
  // Firebase
  FIREBASE_PROJECT_ID: z.string(),
  FIREBASE_PRIVATE_KEY: z.string(),
  FIREBASE_CLIENT_EMAIL: z.string().email(),

  FRONTEND_URL: z.string(),
});

// Parsea y exporta
export const env = envSchema.parse(process.env);