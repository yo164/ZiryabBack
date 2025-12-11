import admin from 'firebase-admin';
import { env } from './env.js';
import type { Auth } from 'firebase-admin/auth';

// Inicializar Firebase Admin con las credenciales del servicio
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: env.FIREBASE_PROJECT_ID,
    // Convertir "\n" de string a saltos de línea reales
    privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: env.FIREBASE_CLIENT_EMAIL,
  }),
});

// Exportar la instancia de autenticación
export const firebaseAuth: Auth = admin.auth();

// Exportar admin si necesitas usar otros servicios
export default admin;
