import api from "@/api";
import Link from "next/link";

export default async function IdPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const caseStudy = await api.caseStudy.fetch(Number(id));
  return (
    <article className="grid gap-8">
      <Link href="/" className="opacity-80">
        ← Back to list
      </Link>
      <hgroup className=" grid gap-2">
        <h2 className="text-xl font-bold">{caseStudy.title}</h2>
        <img
          src={caseStudy.hero_image}
          alt={caseStudy.title}
          className="w-full object-cover"
          height={256}
        />
      </hgroup>
      {/* aca va a ir el array de sections */}
      {caseStudy.sections.map((section, index) => (
        <section key={String(index)} className="grid gap-2">
          {section.title ? <h3 className="text-lg font-bold">{section.title}</h3> : null}
          <section className="grid gap-5">
            {section.body_elements.map((element, index) =>
              typeof element == "string" ? (
                <p key={index}>{element}</p>
              ) : (
                <img
                  key={index}
                  src={element.image_url}
                  alt={section.title || caseStudy.title}
                  height={320}
                  className="w-full object-cover"
                />
              )
            )}
          </section>
        </section>
      ))}
    </article>
  );
}
