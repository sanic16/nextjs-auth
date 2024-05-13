import NewsList from "@/components/NewsList";
import { getLatestNews } from "@/utils/db";
import { Content } from "next/font/google";
import { title } from "process";

export default async function LatestNewsPage() {
  const latestNews = await getLatestNews(3);
  const news = latestNews.map((newsItem) => {
    return {
      id: newsItem.id.toString(),
      slug: newsItem.slug,
      title: newsItem.title,
      content: newsItem.content,
      date: newsItem.date.toString(),
      image: newsItem.image,
    };
  });
  return (
    <>
      <h2>Latest News Page</h2>
      <NewsList news={news} />
    </>
  );
}
