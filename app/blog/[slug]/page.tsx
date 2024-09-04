import { client, urlFor } from "../../lib/sanity";
import { fullBlog } from "../../lib/interface";
import Image from "next/image";

async function getData(slug: string) {
  const query = `
    *[_type == "blog" && slug.current == '${slug}'] {
        "currentSlug": slug.current,
        title,
        content,
        titleImage
    
    }[0]`;

  const data = await client.fetch(query);
  return data;
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullBlog = await getData(params.slug);

  return (
    <div>
      <h1> Jan- Marshal Blog</h1>
      <h2>{data.title}</h2>
      <Image
        src={urlFor(data.titleImage).url()}
        width={800}
        height={800}
        priority
        alt="Title Image"
      />
    </div>
  );
}
