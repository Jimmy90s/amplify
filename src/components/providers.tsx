"use client";

import awsconfig from "../aws-exports";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Authenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { CartProvider } from "use-shopping-cart";

interface Props {
  children: React.ReactNode;
}
Amplify.configure({ ...awsconfig, ssr: true });

export function Providers({ children }: Props) {
  return (
    <Authenticator.Provider>
      <CartProvider
        currency="USD"
        shouldPersist
        cartMode="checkout-session"
        stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster />
          {children}
          <TailwindIndicator />
        </ThemeProvider>
      </CartProvider>
    </Authenticator.Provider>
  );
}
