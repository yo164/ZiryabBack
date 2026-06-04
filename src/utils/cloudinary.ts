import { v2 as cloudinary } from 'cloudinary';
import type { Express } from 'express';
import { env } from '../config/env.js';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export const CLOUDINARY_FOLDERS = {
  justifications: 'ziryab/justifications',
  tasks: 'ziryab/tasks',
  submissions: 'ziryab/submissions',
} as const;

/**
 * Sube un fichero recibido por Multer (memoryStorage) y devuelve la URL HTTPS pública.
 */
export async function uploadFromMulter(
  file: Express.Multer.File,
  folder: string,
): Promise<string> {
  const result = await cloudinary.uploader.upload(
    `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
    { folder, resource_type: 'auto' },
  );
  if (!result.secure_url) {
    throw new Error('Cloudinary no devolvió URL del archivo');
  }
  return result.secure_url;
}
