import Image from "next/image";
import ModalBackdrop from "./ModalBackdrop";
import { getIndividualNews } from "@/utils/db";

export default async function InterceptedImagePage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const newsItemSlug = params.slug;

  //   if (!newsItem) {
  //     notFound();
  //   }
  const newsItem = await getIndividualNews(newsItemSlug);

  if (!newsItem) {
    return null;
  }

  return (
    <>
      <ModalBackdrop />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <Image src={newsItem.image} alt={newsItem.title} fill />
        </div>
      </dialog>
    </>
  );
}
