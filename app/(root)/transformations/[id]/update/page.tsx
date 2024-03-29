import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { getUserById } from "@/lib/actions/user.actions";
//import { getImageById } from "@/lib/actions/image.actions";
import { images } from "@/constants/data";

const Page = async ({ params: { id } }: SearchParamProps) => {
  //const { userId } = auth();

  // if (!userId) redirect("/sign-in");

  // const user = await getUserById(userId);
  const image = images.find((image) => image._id.toString() === id);


  return (
    <>
      <Header title='Una transformacion' subtitle='Muy bien hecha' />

      <section className="mt-10">
        {image?.height}
        <TransformationForm
          action="Update"
          // userId={user._id}
          type="fill"
          // creditBalance={user.creditBalance}
          config={null}
          data={image? image : null}
        />
      </section>
    </>
  );
};

export default Page;