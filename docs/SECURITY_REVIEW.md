# Revisión de Seguridad (Code Security Review) - Backend / Frontend

## 1. Autenticación y Gestión de Sesiones
- **Puntos Fuertes**: 
  - Se utiliza JWT para autenticación sin estado de forma adecuada. 
  - El token se transmite globalmente de forma segura en una cookie (`req.cookies.auth_token`) manejada posiblemente como `HttpOnly`. Esto mitiga gran cantidad de ataques de robo de sesión via Cross-Site Scripting (XSS).
  - El middleware de autenticación (`auth.ts`) inspecciona explícitamente el token y realiza `type casting` cuidadoso para proteger el tipado estático y dinámico.
- **Recomendaciones**:
  - **CSRF**: Puesto que se usan cookies, es imperativo asegurar que la cookie usa `SameSite=Strict` o `SameSite=Lax`. Si no está configurado, implementa una capa adicional de protección contra CSRF (Cross-Site Request Forgery) o añade dicho flag a las cookies.

## 2. Autorización y Prevención de IDOR (Insecure Direct Object Reference)
- **Puntos Fuertes**:
  - Las rutas están protegidas mediante el middleware `authorize`, limitando los endpoints a roles explícitos (`['ADMIN', 'TEACHER', 'STUDENT']`).
  - Existen protecciones manuales muy acertadas en controladores clave como `student-task.controller.ts` para evitar que un alumno pueda borrar o entregar tareas bajo la identidad o ID de otro alumno (`studentEnrollment.idStudent !== req.user.sub`).
- **Recomendaciones**:
  - Extender exhaustivamente esta política a todos los endpoints que consulten registros individuales. Asegúrate de que en endpoints como `GET /api/student-tasks/:id` también se apliquen estos filtros IDOR, asegurándose de que si el rol es STUDENT, sólo le pertenezca a este.

## 3. Vulnerabilidad en la Subida de Archivos (Severidad: ALTA)
- **Puntos Fuertes**:
  - Subidas como `uploadJustification` validan fuertemente el tipo de archivo (solo `pdf`, `png`, `jpeg`), y tienen límites de peso correctos.
- **Hallazgo Crítico**:
  - El middleware `uploadSubmission` **no cuenta con ningún filtro de formato (`fileFilter`)**. Únicamente valida el peso que está permitido hasta 50MB. Esto introduce una vulnerabilidad de "Unrestricted File Upload". Un estudiante con intenciones maliciosas podría subir scripts ejecutables (`.exe`, `.sh`, `.php`, `.js`) o archivos maliciosos.
- **Solución Sugerida**:
  - Modificar `uploadSubmission` en `upload.ts` estableciendo un `fileFilter` que admita solo aplicaciones seguras (`.pdf`, `.zip`, `.rar`, `.docx`, etc.).
  - Asegurarse de que el servidor estático devuelva estas rutas de subida con la cabecera HTTP `Content-Disposition: attachment;` para que el navegador nunca las ejecute.

## 4. Base de Datos
- **Puntos Fuertes**:
  - El uso extensivo del ORM Prisma aísla enormemente las consultas (Parameterization), descartando vulnerabilidades convencionales de Inyección SQL (SQLi).
- **Recomendaciones**:
  - Proteger los `.env` asegurándose de no exponer credenciales y revisando continuamente que no se commitean (ya lo están en `.gitignore`, lo cual es correcto).

## 5. Resumen
La arquitectura implementa defensas maduras de serie bastante potentes. La prioridad número 1 a mitigar en el código existente debería ser sanitizar la subida de archivos (MIME Types restrictivos) en la entrega de tareas (`uploadSubmission`).
