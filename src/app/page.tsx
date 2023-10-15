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

Amplify.configure(awsconfig);

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
interface Props {
  searchParams: {
    date?: string;
    price?: string;
    color?: string;
    category?: string;
    sizes?: string;
    search?: string;
  };
}

export default async function Page({ searchParams }: Props) {
  console.log(searchParams);
  const { date = "desc", price, color, category, sizes, search } = searchParams;

  // Simple query
  const allProducts: any = await API.graphql<GraphQLQuery<ListProductsQuery>>({
    query: queries.listProducts,
  });
  let products = allProducts.data?.listProducts?.items;

  const userSortChoice = (products: any, searchParams: any) => {
    if (price === "asc") {
      return products.sort((a: any, b: any) => a.price - b.price);
    } else if (price === "desc") {
      return products.sort((a: any, b: any) => b.price - a.price);
    } else if (date === "desc") {
      return products.sort((a: any, b: any) => b.createdAt - a.createdAt);
    }
  };
  // let list: any;
  // color
  //   ? (list = products.filter(
  //       (product: any) =>
  //         product.colors.includes(color) === true &&
  //         product.categories.includes(category) === true
  //     ))
  //   : category
  //   ? (list = products.filter(
  //       (product: any) =>
  //         product.categories.includes(category) === true &&
  //         product.colors.includes(color) === true
  //     ))
  //   : sizes
  //   ? (list = products.filter(
  //       (product: any) =>
  //         product.sizes.includes(sizes) === true &&
  //         product.categories.includes(category) === true &&
  //         product.colors.includes(color) === true
  //     ))
  //   : (list = products);

  search
    ? products.filter((product: any) =>
        product.name.toLowerCase().includes(search?.toLowerCase())
      )
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
        (product: any) => product.sizes.includes(sizes) == true
      ))
    : (products = products);

  let sortedList = userSortChoice(products, searchParams);
  console.log(sortedList);
  // const [products, setProducts] = useState(
  //   allProducts.data?.listProducts?.items
  // );
  // console.log(allProducts); // result: { "data": { "listTodos": { "items": [/* ..... */] } } }

  // Fetch a single record by its identifier
  // const oneProduct = await API.graphql<GraphQLQuery<GetProductQuery>>({
  //   query: queries.getProduct,
  //   variables: { id: "some id" },
  // });

  return (
    <div>
      <div className="px-4 pt-20 text-center">
        <h1 className="text-4xl font-extrabold tracking-normal">Name</h1>
        <p className="mx-auto mt-4 max-w-3xl text-base">Description</p>
      </div>
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
              {/* {products?.map((product) => (
                <div key={product?.id}>
                  <li>{product?.slug}</li>
                  <li>{product?.name}</li>
                  {product?.images?.map((image) => (
                    <img src={image} alt={image} key={product.id} />
                  ))}
                </div>
              ))} */}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
