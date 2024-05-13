import { getIndividualNews } from "@/utils/db";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ImagePage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const newsItemSlug = params.slug;

  const newsItem = await getIndividualNews(newsItemSlug);

  // if(!newsItem){
  //   notFound()
  // }

  if (!newsItem) {
    return null;
  }

  console.log(newsItem);

  return (
    <div className="fullscreen-image">
      <Image src={newsItem?.image} alt={newsItem.title} fill />
    </div>
  );
}
