"use client";

import { useToast } from "./ui/use-toast";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Authenticator } from "@aws-amplify/ui-react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { UserIcon, ShoppingBag, Edit2Icon, FileEditIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useShoppingCart } from "use-shopping-cart";

export function SiteHeader() {
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const pathname = usePathname();
  const router = useRouter();
  const serachParams = useSearchParams();
  const defualtSearchQuery = serachParams.get("search") ?? "";
  const { cartCount } = useShoppingCart();

  const onSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQuery = formData.get("search");
    router.replace(`/?search=${searchQuery}`);
  };
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between space-x-4 px-6 sm:space-x-0">
        <MainNav />
        <form
          onSubmit={onSubmit}
          className="hidden items-center lg:inline-flex"
        >
          <Input
            id="search"
            name="search"
            type="search"
            autoComplete="off"
            placeholder="Search products..."
            className="h-9 lg:w-[300px]"
            defaultValue={defualtSearchQuery}
          />
        </form>
        <div className="flex items-center space-x-1">
          {user && (
            <Link href="/addProduct">
              <Button size="sm" variant="ghost">
                <FileEditIcon className="h-5 w-5" />
              </Button>
            </Link>
          )}

          <Link href="/profile">
            <Button size="sm" variant="ghost">
              <UserIcon className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/cart">
            <Button size="sm" variant="ghost">
              <ShoppingBag className="h-5 w-5" />
              <span className="ml-2 text-sm font-bold">{cartCount}</span>
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
