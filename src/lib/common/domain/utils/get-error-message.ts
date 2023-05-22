const Errors: Record<string, string | undefined> = {
  'Course not exists': 'El curso no existe',
  'Course not active': 'El curso no está activo',
  'Course already subscribed': 'Ya estás inscrito en el curso',
  'Course not owns': 'El curso no te pertenece',
  'File not uploaded': 'El archivo no se pudo subir',
  'Student not subscribed to course': 'No estás inscrito en el curso',
  'Homework not assigned': 'La tarea no está asignada',
  'Assignment already delivered': 'La tarea ya fue entregada',
  'Homework not found': 'La tarea no existe',
  'Request failed with status code 500': 'Error interno del servidor',
  Unauthorized: 'No autorizado',
};

export const getErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') {
    return Errors[error] ?? error;
  }

  if (error instanceof Error) {
    return Errors[error.message] ?? error.message;
  }

  if (Array.isArray(error)) {
    return error.map(getErrorMessage).join(', ');
  }

  return JSON.stringify(error);
};
