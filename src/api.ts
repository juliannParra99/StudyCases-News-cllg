//aca van ir los metodos con los que voy a interactuar con mi Api. Como por ejemplo traerme el json filtrarlo y devolverlo.

import { error } from "console";
import { notFound } from "next/navigation";

// Importamos la interfaz 'CaseStudy' que describe la estructura de los estudios de caso.

export interface CaseStudy {
  id: number;
  client: string | null;
  teaser?: string;
  vertical: string;
  is_enterprise: boolean;
  title: string;
  hero_image: string;
  app_store_url?: string | null;
  sections: {
    title: null | string;
    body_elements: (
      | {
          image_url: string;
        }
      | string
    )[];
  }[];
}

// Definimos un objeto 'api' que contiene métodos para interactuar con estudios de caso.

const api = {
  caseStudy: {
    // El método 'list' obtiene una lista de estudios de caso.

    list: (): Promise<CaseStudy[]> =>
      fetch(
        "https://raw.githubusercontent.com/theappbusiness/engineering-challenge/main/endpoints/v1/caseStudies.json"
      )
        .then((res) => res.json() as Promise<{ case_studies: CaseStudy[] }>)
        .then((data) => data.case_studies)
        .then((caseStudies) =>
          caseStudies.filter(
            (caseStudy) =>
              caseStudy.teaser && caseStudy.title && caseStudy.hero_image
          )
        ),
    // El método 'fetch' recibe un 'id' y obtiene un estudio de caso específico.

    fetch: async (id: CaseStudy["id"]): Promise<CaseStudy> => {
      const caseStudy = await api.caseStudy
        .list()
        .then((caseStudies) =>
          caseStudies.find((caseStudies) => caseStudies.id == id)
        );

      if (!caseStudy) {
        //saco de esto del next/navigation
        return notFound();
      }
      return caseStudy;
    },
  },
};

export default api;
