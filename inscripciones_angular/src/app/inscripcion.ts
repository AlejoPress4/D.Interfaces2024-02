export type Inscripcion = {
  estudiante: {
    identificacion: string;
    codigo: string;
    nombre: string;
    semestre: number;
  };
  grupo: {
    codigo: string;
    anio: number;
    periodo: number;
    cupo: number;
    horario: string;
    semanas: number;
    horasSemana: number;
    asignatura: {
      codigo: string;
      nombre: string;
      cuantitativa: boolean;
      horas: number;
    };
    profesor: {
      identificacion: string;
      nombre: string;
      correo: string;
    };
  };
  notas: number[];
  definitiva: number;
  inasistencia: number;
};

export type Estudiante = {
  identificacion: string;
  codigo: string;
  nombre: string;
  semestre: number;
};

export type Asignatura = {
  codigo: string;
  nombre: string;
  cuantitativa: boolean;
  horas: number;
};

export type Profesor = {
  identificacion: string;
  nombre: string;
  correo: string;
};

export type Grupo = {
  codigo: string;
  anio: number;
  periodo: number;
  cupo: number;
  horario: string;
  semanas: number;
  horasSemana: number;
  asignatura: Asignatura;
  profesor: Profesor;
};

export type InfoInscripcion = {
  // estudiante: Estudiante;
  grupo: Grupo;
  notas: number[];
  definitiva: number;
  inasistencia: number;
};

export type InfoEstudiante = {
  estudiante: Estudiante;
  info: InfoInscripcion[];
  promedio? : number;
  rendimiento? : string;
};
