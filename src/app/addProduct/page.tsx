"use client";

import "@/styles/globals.css";
import { CreateProductInput, CreateProductMutation } from "../../API";
import awsconfig from "../../aws-exports";
import ImageDropzone from "../../components/ImageDropzone";
import { createProduct } from "../../graphql/mutations";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { Button, Grid, TextField } from "@mui/material";
import { Container } from "@mui/material";
import { API, Amplify, Storage } from "aws-amplify";
import { useRouter } from "next/navigation";
import React, { ReactElement, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
// import { v4 as uuidv4 } from "uuid";
import uuid from "react-uuid";

Amplify.configure(awsconfig);

interface IFormInput {
  name: string | null;
  slug?: string | null;
  images?: Array<string | null> | null;
  categories?: Array<string | null> | null;
  sizes?: Array<string | null> | null;
  colors?: Array<string | null> | null;
  description?: Array<string | null> | null;
  sku?: Array<string | null> | null;
  currency?: Array<string | null> | null;
  price?: number | null;
}

interface Props {}
const categories = ["bags", "belts", "gloves", "scarves", "wallets"];

const colors = ["black", "blue", "green", "yellow"];

const sizes = ["xs", "s", "m", "l", "xl", "one-size"];

export default function Create({}: Props): ReactElement {
  const [file, setFile] = useState<File>();
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(file);
    console.log(data);

    // User uploaded file
    if (file) {
      // Send a request to upload to the S3 Bucket.
      try {
        const imagePath = uuid();

        await Storage.put(imagePath, file, {
          contentType: file.type, // contentType is optional
        });

        const createNewProductInput: CreateProductInput = {
          name: data.name,
          slug: data.name,
          images: [imagePath],
          categories: data.categories,
          sizes: data.sizes,
          colors: data.colors,
          description: data.description,
          sku: data.sku,
          currency: data.currency,
          price: data.price,
        };

        const createNewProduct = (await API.graphql({
          query: createProduct,
          variables: { input: createNewProductInput },
        })) as { data: CreateProductMutation };

        console.log("New Product created successfully:", createNewProduct);

        router.push(
          `/products/${createNewProduct.data.createProduct?.name}?${createNewProduct.data.createProduct?.id}`
        );
      } catch (error) {
        console.error("Error uploading file: ", error);
      }
    } else {
      const createNewProductWithoutImageInput: CreateProductInput = {
        name: data.name,
        slug: data.name,
        categories: data.categories,
        sizes: data.sizes,
        colors: data.colors,
        description: data.description,
        sku: data.sku,
        currency: data.currency,
        price: data.price,
      };

      const createNewProductWithoutImage = (await API.graphql({
        query: createProduct,
        variables: { input: createNewProductWithoutImageInput },
      })) as { data: CreateProductMutation };

      router.push(
        `/products/${createNewProductWithoutImage.data.createProduct?.name}?${createNewProductWithoutImage.data.createProduct?.id}`
      );
    }
  };

  return (
    <Container maxWidth="md">
      {/* Create a form where: */}
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2"
              htmlFor="name"
            >
              Product Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-400 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="name"
              type="text"
            />
            <label
              className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2"
              htmlFor="price"
            >
              Product Price
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-400 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="price"
              type="number"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-200 text-gray-400 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="description"
              placeholder="Doe"
              rows={5}
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2"
              htmlFor="categories"
            >
              Category
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="categories"
              >
                <option>{categories[0]}</option>
                <option>{categories[1]}</option>
                <option>{categories[2]}</option>
                <option>{categories[3]}</option>
                <option>{categories[4]}</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2"
              htmlFor="colors"
            >
              Color
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="colors"
              >
                <option>{colors[0]}</option>
                <option>{colors[1]}</option>
                <option>{colors[2]}</option>
                <option>{colors[3]}</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2"
              htmlFor="sizes"
            >
              Size
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-400 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="sizes"
              >
                <option>{sizes[0]}</option>
                <option>{sizes[1]}</option>
                <option>{sizes[2]}</option>
                <option>{sizes[3]}</option>
                <option>{sizes[4]}</option>
                <option>{sizes[5]}</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <Grid item>
          <ImageDropzone file={file} setFile={setFile} />
        </Grid>

        {/* Button to submit the form with those contents */}
        <Grid item>
          <Button variant="contained" type="submit">
            Create Product
          </Button>
        </Grid>
      </form>
    </Container>
  );
}
