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
function cloudinaryResourceType(mimetype: string, filename: string): 'image' | 'video' | 'raw' | 'auto' {
  const mime = mimetype.toLowerCase();
  if (mime.startsWith('image/')) return 'image';
  if (mime.startsWith('audio/') || mime.startsWith('video/')) return 'video';
  if (
    mime === 'application/pdf' ||
    mime.includes('zip') ||
    mime.includes('word') ||
    mime.includes('document') ||
    mime.includes('spreadsheet') ||
    mime.includes('presentation') ||
    mime === 'text/plain' ||
    mime === 'application/msword' ||
    mime === 'application/vnd.ms-excel' ||
    mime === 'application/vnd.ms-powerpoint'
  ) {
    return 'raw';
  }
  const ext = filename.split('.').pop()?.toLowerCase() ?? '';
  if (['zip', 'doc', 'docx', 'odt', 'txt', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf'].includes(ext)) {
    return 'raw';
  }
  return 'auto';
}

export async function uploadFromMulter(
  file: Express.Multer.File,
  folder: string,
): Promise<string> {
  const resourceType = cloudinaryResourceType(file.mimetype, file.originalname);
  const result = await cloudinary.uploader.upload(
    `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
    { folder, resource_type: resourceType },
  );
  if (!result.secure_url) {
    throw new Error('Cloudinary no devolvió URL del archivo');
  }
  return result.secure_url;
}
