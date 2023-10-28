"use client";

import { CreateProductInput, CreateProductMutation } from "../API";
import { ListProductsQuery, GetProductQuery } from "../API";
import awsconfig from "../aws-exports";
import * as mutations from "../graphql/mutations";
import * as queries from "../graphql/queries";
import * as subscriptions from "../graphql/subscriptions";
import { ProductFilters } from "@/components/product-filters";
import { ProductGrid } from "@/components/product-grid";
import { ProductSort } from "@/components/product-sort";
import { SanityProduct } from "@/config/inventory";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { GraphQLQuery } from "@aws-amplify/api";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

Amplify.configure({ ...awsconfig, ssr: true });
// const productDetails: CreateProductInput = {
//   sku: ["khaki_tote_bag_1"],
//   name: "Khaki Tote Bag",
//   description: [
//     `Meet your new favorite carry-on. Our supersized tote is crafted in durable waxed cotton canvas that's rugged and durable, ideal for hauling all of your stuff. This size takes you to and from the farmer's market, the gym or a weekend getaway.`,
//   ],
//   price: 14500,
//   images: [
//     "https://fullstackdotso.nyc3.cdn.digitaloceanspaces.com/khaki-tote-bag-1.jpg",
//     "https://fullstackdotso.nyc3.cdn.digitaloceanspaces.com/khaki-tote-bag-2.jpg",
//     "https://fullstackdotso.nyc3.cdn.digitaloceanspaces.com/khaki-tote-bag-3.jpg",
//   ],
//   sizes: ["one-size"],
//   categories: ["bags"],
//   colors: ["blue"],
//   currency: ["USD"],
//   slug: "Khaki Tote Bag",
// };

// const newProduct = await API.graphql<GraphQLQuery<CreateProductMutation>>({
//   query: mutations.createProduct,
//   variables: { input: productDetails },
// });

// Fetch a single record by its identifier
// const oneProduct = await API.graphql<GraphQLQuery<GetProductQuery>>({
//   query: queries.getProduct,
//   variables: { id: "some id" },
// });
type Repo = {
  products: any
}
interface Props {
  searchParams: {
    date?: string | boolean | undefined;
    price?: string;
    color?: string;
    category?: string;
    sizes?: string;
    search?: string;
  };
  products?:any
}

// async function getData() {
//   // Simple query
//   let allProducts: any = await API.graphql<GraphQLQuery<ListProductsQuery>>(
//     {
//       query: queries.listProducts,
//     },
//     { cache: "force-cache" }
//   );

//   let products = await allProducts.data?.listProducts?.items;

//   return products;
// }

export default function Home({ searchParams }: Props, { products }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  //let products = await getData();

  console.log(searchParams);
  const { date = "desc", price, color, category, sizes, search } = searchParams;

  const userSortChoice = (products: any, searchParams: any) => {
    if (price === "asc") {
      return products.sort((a: any, b: any) => a.price - b.price);
    } else if (price === "desc") {
      return products.sort((a: any, b: any) => b.price - a.price);
    } else if (date === "desc") {
      return products.sort((a: any, b: any) => b.createdAt - a.createdAt);
    }
  };

  search
    ? (products = products.filter((product: any) =>
        product.name.toLowerCase().includes(search?.toLowerCase())
      ))
    : (products = products);
  color
    ? (products = products.filter(
        (product: any) => product.colors.includes(color) === true
      ))
    : (products = products);
  category
    ? (products = products.filter(
        (product: any) => product.categories.includes(category) === true
      ))
    : (products = products);
  sizes
    ? (products = products.filter(
        (product: any) => product.sizes.includes(sizes) === true
      ))
    : (products = products);

  let sortedList = userSortChoice(products, searchParams);
  console.log(sortedList);

  return (
    <div>
      <div>
        <main className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 pt-24 dark:border-gray-800">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              {products?.length} result
              {products?.length === 1 ? "" : "s"}
            </h1>
            {/* Product Sort */}
            <ProductSort />
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>
            <div
              className={cn(
                "grid grid-cols-1 gap-x-8 gap-y-10 ",
                products ? "lg:grid-cols-4" : "lg:grid-cols-[1fr_3fr]"
              )}
            >
              <div className="hidden lg:block">
                {/* Product filters */}
                <ProductFilters />
              </div>
              {/* Product grid */}
              <ProductGrid products={sortedList} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}



export const getServerSideProps = (async (context) => {
  // ...
  const allProducts: any = await API.graphql<GraphQLQuery<ListProductsQuery>>({
    query: queries.listProducts,
  });

  const products = await allProducts.data?.listProducts?.items;
  // Pass data to the page via props
  return { props: { products } };
})satisfies GetServerSideProps<{
  products: Repo
}>

async function getData() {
  // Simple query
  let allProducts: any = await API.graphql<GraphQLQuery<ListProductsQuery>>(
    {
      query: queries.listProducts,
    },
    { cache: "force-cache" }
  );

  let products = await allProducts.data?.listProducts?.items;

  return products;
}
