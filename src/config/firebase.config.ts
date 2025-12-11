import admin from 'firebase-admin';
import { env } from './env.js';
import type { Auth } from 'firebase-admin/auth';

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: env.FIREBASE_PROJECT_ID,
    privateKey: env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: env.FIREBASE_CLIENT_EMAIL,
  }),
});

export const firebaseAuth: Auth = admin.auth();
export default admin;
