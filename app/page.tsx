import Navbar from "./componets/Navbar";
import { simpleBlogCard } from "./lib/interface";
import { client, urlFor } from "./lib/sanity";
import Image from "next/image";

async function getData() {
  const query = `*[_type == 'blog'] | order(_createdAt desc) {
  title,
    smallDescription,
    "currentSlug": slug.current,
    titleImage
}`;

  const data = await client.fetch(query);

  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();

  return (
    <div>
      <Navbar />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "40px" }}>
        {data.map((post, idx) => (
          <div key={idx} style={{ width: "20svw" }}>
            <Image
              src={urlFor(post.titleImage).url()}
              alt="image"
              width={200}
              height={200}
            />
            <p>{post.title}</p>
            <p>{post.smallDescription}</p>
            <p>{post.currentSlug}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
