import NewsList from "@/components/NewsList";
import { getNews } from "@/utils/db";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "News Page",
  description: "View the latest news.",
};

export default async function NewsPage() {
  const news = await getNews();

  const transformedNews = news.map((newsItem) => {
    return {
      id: newsItem.id.toString(),
      slug: newsItem.slug,
      title: newsItem.title,
      content: newsItem.content,
      date: new Date(newsItem.date).toLocaleDateString(),
      image: newsItem.image,
    };
  });

  return (
    <>
      <h1>News Page</h1>
      <NewsList news={transformedNews} />
    </>
  );
}
