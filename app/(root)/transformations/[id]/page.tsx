import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/shared/Header";
//import TransformedImage from "@/components/shared/TransformedImage";
import { Button } from "@/components/ui/button";
//import { getImageById } from "@/lib/actions/image.actions";
import { getImageSize } from "@/lib/utils";
//import { DeleteConfirmation } from "@/components/shared/DeleteConfirmation";

import {images} from "@/constants/data";

const ImageDetails = ({ params: { id } }: SearchParamProps) => {
  //const { userId } = auth();

  const image = images.find((image) => image._id.toString() === id);

  return (
    <>
      <Header title={image?.url} />

      <section className="mt-5 flex flex-wrap gap-4">
        <div className="p-14-medium md:p-16-medium flex gap-2">
          <p className="text-dark-600">Transformation:</p>
          <p className=" capitalize text-purple-400">
            {image?._id}
          </p>
        </div>

        {image?.prompt && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2 ">
              <p className="text-dark-600">Prompt:</p>
              <p className=" capitalize text-purple-400">{image.prompt}</p>
            </div>
          </>
        )}

        {image?.color && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2">
              <p className="text-dark-600">Color:</p>
              <p className=" capitalize text-purple-400">{image.color}</p>
            </div>
          </>
        )}

        {image?.width && (
          <>
            <p className="hidden text-dark-400/50 md:block">&#x25CF;</p>
            <div className="p-14-medium md:p-16-medium flex gap-2">
              <p className="text-dark-600">Aspect Ratio:</p>
              <p className=" capitalize text-purple-400">{image.width}</p>
            </div>
          </>
        )}
      </section>

      <section className="mt-10 border-t border-dark-400/15">
        <div className="transformation-grid">
          {/* MEDIA UPLOADER */}
          <div className="flex flex-col gap-4">
            <h3 className="h3-bold text-dark-600">Tu imagen pana</h3>

            <Image
              width={image?.width}
              height={image?.height}
              src={image?.url ?? ""}
              alt="image"
              className="transformation-original_image"
            />
          </div>

          <Button asChild type="button" className="submit-button capitalize">
              <Link href={`/transformations/${image?._id}/update`}>
                Update Image
              </Link>
          </Button>

          {/* TRANSFORMED IMAGE */}
          {/* <TransformedImage
            image={image}
            type={image.transformationType}
            title={image.title}
            isTransforming={false}
            transformationConfig={image.config}
            hasDownload={true}
          /> */}
        </div>

        {/* {userId === image.author.clerkId && (
          <div className="mt-4 space-y-4">
            

            <DeleteConfirmation imageId={image._id} />
          </div>
        )} */}
      </section>
    </>
  );
};

export default ImageDetails;