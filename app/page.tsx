import Link from "next/link";
import Navbar from "./componets/Navbar";
import { simpleProjectCard } from "./lib/interface";
import { client, urlFor } from "./lib/sanity";
import Image from "next/image";

export const revalidate = 30; // revalidate at most at 30 seconds

async function getData() {
  const query = `*[_type == 'project'] | order(_createdAt desc) {
  title,
    smallDescription,
    "currentSlug": slug.current,
    titleImage
}`;

  const data = await client.fetch(query);

  return data;
}

export default async function Home() {
  const data: simpleProjectCard[] = await getData();

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Navbar />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          width: "800px",
        }}
      >
        {data.map((post, idx) => (
          <div key={idx} style={{ width: "10svw" }}>
            <Image
              src={urlFor(post.titleImage).url()}
              alt="image"
              width={200}
              height={200}
            />
            <p>{post.title}</p>
            <p>{post.smallDescription}</p>
            <button>
              <Link href={`/project/${post.currentSlug}`}>Read more</Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
