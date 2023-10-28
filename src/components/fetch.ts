"use client";

import awsconfig from "../aws-exports";
import * as queries from "../graphql/queries";
import { ListProductsQuery } from "@/API";
import { GraphQLQuery } from "@aws-amplify/api";
//import { useAuthenticator } from "@aws-amplify/ui-react";
import { API, Amplify } from "aws-amplify";

Amplify.configure({ ...awsconfig, ssr: true });

export async function getData() {
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

// import React from "react";

// type Props = {};

// const Products = async (props: Props) => {
//   const { user, signOut } = useAuthenticator((context) => [context.user]);
//   async function getData() {
//     // Simple query
//     let allProducts: any = await API.graphql<GraphQLQuery<ListProductsQuery>>(
//       {
//         query: queries.listProducts,
//       },
//       { cache: "force-cache" }
//     );

//     let products = await allProducts.data?.listProducts?.items;

//     return products;
//   }
//   return getData();
// };

// export default Products;
