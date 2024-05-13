import NewsList from "@/components/NewsList";
import { getNews } from "@/utils/db";

// type FetchedNews = {
//   id: number;
//   slug: string;
//   title: string;
//   content: string;
//   date: string;
//   image: string;
//   NewsImage: {
//       id: number;
//       src: string;
//       height: number;
//       width: number;
//   }[]
// }

// type News = {
//   id: string
//   slug: string
//   title: string
//   image: {
//       src: string
//       height: number
//       width: number
//   }
//   date: string
//   content: string
// }

// const fetchData = async(): Promise<FetchedNews[]> => {
//   const data = await fetch('http://localhost:8000/api/news')

//   if(!data.ok){
//     throw new Error('Failed to fetch data')
//   }
//   const jsonData = await data.json()
//   return jsonData
// }

export default async function NewsPage() {
  // const data = await fetchData()

  // const news: News[] = data.map(newsItem => {
  //   return {
  //     id: newsItem.id.toString(),
  //     slug: newsItem.slug,
  //     title: newsItem.title,
  //     content: newsItem.content,
  //     date: new Date(newsItem.date).toLocaleDateString(),
  //     image: {
  //       src: newsItem.NewsImage[0].src,
  //       height: newsItem.NewsImage[0].height,
  //       width: newsItem.NewsImage[0].width
  //     }
  //   }

  // })
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
