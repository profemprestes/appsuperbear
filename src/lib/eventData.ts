export interface MissionDetails {
  honoree: string;
  venue: string;
  address: string;
  date: string;
  time: string;
  targetDate: string;
  contacts: string[];
  notes: string;
}

export const missionDetails: MissionDetails = {
  honoree: "Gran Facu",
  venue: "Lugar del Evento",
  address: "Dirección del Evento",
  date: "Fecha del Evento",
  time: "Horario del Evento",
  targetDate: "Fecha Objetivo",
  contacts: ["Contacto 1", "Contacto 2"],
  notes: "Notas adicionales",
};
