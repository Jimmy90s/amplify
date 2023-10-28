import awsconfig from "../../../aws-exports";
import * as queries from "../../../graphql/queries";
import { GetProductQuery } from "@/API";
import { ProductGallery } from "@/components/product-gallery";
import { ProductInfo } from "@/components/product-info";
import { SanityProduct } from "@/config/inventory";
import { shimmer, toBase64 } from "@/lib/image";
import { GraphQLQuery } from "@aws-amplify/api";
import { API, Amplify } from "aws-amplify";
import Image from "next/image";

Amplify.configure(awsconfig);

interface Props {
  searchParams: {
    slug?: string;
    id?: number;
  };
}

export default async function Page({ searchParams }: Props) {
  // Fetch a single record by its identifier

  function getKeyByValue(object: any, value: any) {
    for (let prop in object) {
      if (object.hasOwnProperty(prop)) {
        if (object[prop] === value) return prop;
      }
    }
  }

  const ans = getKeyByValue(searchParams, "");

  console.log(ans);
  const oneProduct = await API.graphql<GraphQLQuery<GetProductQuery>>({
    query: queries.getProduct,
    variables: { id: ans },
  });
  console.log(oneProduct);
  const product = oneProduct.data?.getProduct;
  // const pro: any = product?.images?.map((image) => image);
  // const img = pro[0];

  return (
    <main className="mx-auto max-w-5xl sm:px-6 sm:pt-16 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        {/* Product */}

        {/* <Image
          src={img}
          alt={img}
          width={225}
          height={280}
          className="h-full w-full object-cover object-center"
        /> */}

        <div className="pb-20 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
          {/* Product gallery */}
          <ProductGallery product={product} />
          {/* Product info */}
          <ProductInfo product={product} />
        </div>
      </div>
    </main>
  );
}
