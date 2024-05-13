import CreateNewsForm from "@/components/forms/CreateNewsForm";
import { verifyAuth } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const user = await verifyAuth();

  if (!user.user?.id) {
    redirect("/auth?mode=login");
  }

  return (
    <section>
      <CreateNewsForm />
    </section>
  );
}
