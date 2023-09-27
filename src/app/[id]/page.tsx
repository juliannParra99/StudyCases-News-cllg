import api from "@/api"
import Link from "next/link"

export default async function IdPage({params: {id}}:{params:{id:string}}) {
  const caseStudy = await api.caseStudy.fetch(Number(id))
  return (
    <article className="grid gap-8">
      <Link href="/" className="opacity-80">
      ← Back to list
      </Link>
      <hgroup className=" grid gap-2">
          <img src={caseStudy.hero_image} alt={caseStudy.title} className="w-full object-cover" height={256} />
          <div>
            <h2 className="text-xl font-bold">{caseStudy.title}</h2>
            <p className="opacity-80">{caseStudy.teaser}</p>
          </div>
        </hgroup>
    </article>
    )
}

