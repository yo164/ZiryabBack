# Flujo de Tareas de Estudiante (StudentTask)

## 1. Creación de la Tarea (Profesor)
Cuando un profesor crea una tarea (`POST /tasks`), el sistema automáticamente obtiene a todos los estudiantes matriculados (`status: ENROLLED`) en la asignatura y crea una entrada de `StudentTask` para cada uno con estado `PENDING`.

## 2. Entrega de la Tarea (Alumno)
Endpoint: `PUT /student-tasks/:id/submit`
- Autenticación requerida: `STUDENT`.
- Validaciones: El estudiante autenticado solo puede entregar tareas que le pertenecen, es decir, donde su `idStudent` coincide con el registro subyacente.
- Proceso: Si la fecha actual sobrepasa la `dueDate`, se marca como `LATE`, de lo contrario como `SUBMITTED`. Guarda la fecha de entrega y la URL opcional (`attachmentUrl`) si el estudiante subió algún fichero.

## 3. Calificación de la Tarea (Profesor)
Endpoint: `PUT /student-tasks/:id/grade`
- Autenticación requerida: `TEACHER`.
- Validaciones: El profesor solo puede calificar tareas correspondientes a la asignación de su clase (`idTeacher`).
- Proceso: Se requiere adjuntar la nota (`score`) en el cuerpo de la petición HTTP. El estado de la `StudentTask` cambia a `GRADED` y se almacena la nota y opcionalmente el `feedback`.

## 4. Visualización y Filtrado Seguro (Todos)
Endpoint: `GET /student-tasks`
- Al invocar este endpoint, el backend intercepta el rol e id del usuario logueado.
- Si el rol es `TEACHER`, solo devuelve tareas asociadas a sus asignaturas.
- Si el rol es `STUDENT`, solo devuelve sus propias entregas.
