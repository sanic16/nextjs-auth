import { getIndividualNews } from "@/utils/db";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PageDetails({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const newsItem = await getIndividualNews(params.slug);

  if (!newsItem) {
    notFound();
  }

  return (
    <article className="news-article">
      <header>
        <div className="news-img">
          <Link href={`/news/${newsItem.slug}/image`}>
            <Image src={newsItem?.image} alt={newsItem?.title} fill />
          </Link>
        </div>
        <h1>{newsItem.title}</h1>
        <time dateTime={newsItem.date.toString()}>
          {newsItem.date.toISOString()}
        </time>
      </header>
      <p>{newsItem?.content}</p>
    </article>
  );
}
