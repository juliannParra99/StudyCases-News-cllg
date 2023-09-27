import Link from "next/link"

//si bien se creo un caso de manejo de 404 si la pagina no existe en api, el archivo not-found.tsx de next hace esto automaticamente y le da prioridad a este archivo sobre otros manejos del 404
export default function NotFoundPage (){
    return (
      <section className="h-64 text-center text-center opacity-80">
        <p>This case does not exist</p>
        <Link className="underline" href="/">Back to list</Link>
      </section>
    )
  }

