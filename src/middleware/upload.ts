import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

// Asegurarse de que el directorio de uploads existe
const uploadDir = 'uploads/justifications';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración del almacenamiento
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Generar nombre de archivo único con la extensión original
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

// Filtro para validar formato (MÁX 5MB definido abajo, formatos: PDF, PNG, JPG)
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedMimeTypes = ['application/pdf', 'image/png', 'image/jpeg'];
    
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Formato de archivo no soportado. Solo se permiten PDF, PNG y JPG.'));
    }
};

// Configuración completa de multer
export const uploadJustification = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    },
    fileFilter
});

// ============================================
// CONFIGURACIÓN PARA ADJUNTOS EN TAREAS
// ============================================
const taskUploadDir = 'uploads/tasks';
if (!fs.existsSync(taskUploadDir)) {
    fs.mkdirSync(taskUploadDir, { recursive: true });
}

const taskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, taskUploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, 'task-' + uniqueSuffix + ext);
    }
});

// Este 'filtro' es el portero de la discoteca: solo deja pasar a formatos de archivo específicos.
// Si alguien intenta subir un .exe malicioso, le devolverá el Error de abajo.
const taskFileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedMimeTypes = [
        'application/pdf', 
        'image/png', 
        'image/jpeg', 
        'application/zip', 
        'application/x-zip-compressed',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // docx
    ];
    
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Formato de archivo no soportado. Solo se permiten archivos ZIP, DOCX, PDF, JPG o PNG.'));
    }
};

export const uploadTaskAttachment = multer({
    storage: taskStorage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10 MB
    },
    fileFilter: taskFileFilter
});
