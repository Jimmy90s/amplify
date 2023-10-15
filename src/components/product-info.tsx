"use client";

import { Product } from "@/API";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { SanityProduct } from "@/config/inventory";
import { getSizeName } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";

interface Props {
  product: any;
}

export function ProductInfo({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const { addItem, incrementItem, cartDetails } = useShoppingCart();
  const isInCart = !!cartDetails?.[product.id];
  const { toast } = useToast();

  function addToCart() {
    const item = {
      ...product,
      product_data: {
        size: selectedSize,
      },
    };
    isInCart ? incrementItem(item.id) : addItem(item);
    toast({
      title: `${item.name} ${selectedSize.toString()}`,
      description: `${product.name} added to cart`,
      action: (
        <Link href="/cart">
          <Button variant="link" className="gap-x-2 whitespace-nowrap">
            <span>Open Cart</span>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      ),
    });
  }

  return (
    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
      <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>

      <div className="mt-3">
        <h2 className="sr-only">Product information</h2>
        <p className="text-3xl tracking-tight">
          {formatCurrencyString({
            value: product.price as number,
            currency: "USD",
          })}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="sr-only">Description</h3>
        <div className="space-y-6 text-base">{product.description}</div>
      </div>

      <div className="mt-4">
        <p>
          Size: <strong>{selectedSize}</strong>
        </p>
        {product.sizes.map((size: string) => (
          <Button
            onClick={() => setSelectedSize(size)}
            key={size}
            variant={selectedSize === size ? "default" : "outline"}
            className="mr-2 mt-4"
          >
            {size.toString()}
          </Button>
        ))}
      </div>

      <form className="mt-6">
        <div className="mt-4 flex">
          <Button
            onClick={addToCart}
            type="button"
            className="w-full bg-violet-600 py-6 text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            Add to cart
          </Button>
        </div>
      </form>
    </div>
  );
}