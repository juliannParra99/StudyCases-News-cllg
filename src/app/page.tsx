

import Link from "next/link"
import api from "@/api"
 

export default async function Home() {

  const caseStudies = await api.caseStudy.list();

  return (
    <article className="grid grid-cols-[repeat(auto-fill, minmax(480px,1fr))] gap-8">
      {caseStudies.map((caseStudies) => (
        <Link key={caseStudies.id} href={`/${caseStudies.id}`}>
        <hgroup className=" grid gap-2">
          <img src={caseStudies.hero_image} alt={caseStudies.title} className="w-full object-cover h-[256px]" height={256} />
          <div>
            <h2 className="text-xl font-bold">{caseStudies.title}</h2>
            <p className="opacity-80">{caseStudies.teaser}</p>
          </div>
        </hgroup>
      </Link>

      ))}
      
    </article>
  )
}
