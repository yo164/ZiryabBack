import multer from 'multer';
import { Request } from 'express';

const memoryStorage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedMimeTypes = ['application/pdf', 'image/png', 'image/jpeg'];
    
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Formato de archivo no soportado. Solo se permiten PDF, PNG y JPG.'));
    }
};

export const uploadJustification = multer({
    storage: memoryStorage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    },
    fileFilter
});

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
    storage: memoryStorage,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50 MB
    },
    fileFilter: taskFileFilter
});

export const uploadSubmission = multer({
    storage: memoryStorage,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50 MB
    },
    fileFilter: taskFileFilter
});
