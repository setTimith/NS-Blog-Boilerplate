import { client, urlFor } from "../../lib/sanity";
import { fullProject } from "../../lib/interface";
import Image from "next/image";

export const revalidate = 30; // revalidate at most at 30 seconds

async function getData(slug: string) {
  const query = `
    *[_type == "project" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
        title,
        smallDescription,
        titleImage
    
    }[0]`;

  const data = await client.fetch(query);
  return data;
}

export default async function ProjectArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullProject = await getData(params.slug);

  return (
    <div>
      <h2>{data.title}</h2>
      <Image
        src={urlFor(data.titleImage).url()}
        width={800}
        height={800}
        priority
        alt="Title Image"
      />
      <div>
        <p>{data.smallDescription}</p>
      </div>
    </div>
  );
}
