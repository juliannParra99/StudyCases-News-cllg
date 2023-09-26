//aca van ir los metodos con los que voy a interactuar con mi Api. Como por ejemplo traerme el json filtrarlo y devolverlo.

// Importamos la interfaz 'CaseStudy' que describe la estructura de los estudios de caso.

export interface CaseStudy {
  id: number;
  client: string;
  teaser: string;
  vertical: string;
  is_enterprise: boolean;
  title: string;
  hero_image: string;
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
        .then((data) => data.case_studies),
            // El método 'fetch' recibe un 'id' y obtiene un estudio de caso específico.

    fetch: (id: CaseStudy["id"]): Promise<CaseStudy> =>
      api.caseStudy
        .list()
        .then(
          (caseStudies) =>
            caseStudies.find((caseStudies) => caseStudies.id == id)!
        ),
  },
};

export default api;


// list: Este método hace una solicitud a una URL remota para obtener una lista de estudios de caso y devuelve una promesa que se resuelve en un array de objetos CaseStudy.

// fetch: Este método recibe un id como parámetro y utiliza el método list para obtener todos los estudios de caso y luego busca el estudio de caso específico por su id.

// Explicacion de ambos metodos: 

// Método list:

// Este método es una función que no toma ningún parámetro y devuelve una promesa (Promise<CaseStudy[]>).

// Dentro de la función, se utiliza la función fetch de JavaScript para hacer una solicitud GET a una URL remota. Esta URL contiene un archivo JSON que contiene datos sobre estudios de caso.

// La función fetch devuelve una promesa que representa la respuesta de la solicitud HTTP. La respuesta se maneja en el siguiente then.

// En el primer .then, se convierte la respuesta en un objeto JSON utilizando res.json(). Esto también devuelve una promesa que se resuelve en el objeto JSON.

// En el segundo .then, se accede a la propiedad case_studies del objeto JSON, que contiene un array de objetos de estudio de caso.

// Finalmente, el método list devuelve una promesa que se resuelve en este array de objetos CaseStudy. En otras palabras, cuando se llama a api.caseStudy.list(), obtienes una promesa que se resuelve en la lista de estudios de caso.

// Método fetch:

// Este método toma un parámetro id, que es el identificador del estudio de caso que se desea recuperar.

// Internamente, llama al método list para obtener todos los estudios de caso mediante api.caseStudy.list().

// Luego, en el .then de la promesa devuelta por list, utiliza el método find para buscar el estudio de caso específico que coincide con el id proporcionado.

// Finalmente, devuelve una promesa que se resuelve en el estudio de caso encontrado. Si no se encuentra ningún estudio de caso con el id proporcionado, esto podría generar un error ya que no se maneja el caso en el que find no encuentre coincidencias.

// En resumen, el método list obtiene una lista de estudios de caso y el método fetch recibe un id y busca ese estudio de caso específico dentro de la lista. Ambos métodos trabajan con promesas para manejar la asincronía de las solicitudes HTTP y la búsqueda de datos.