"use client";

import "@/styles/globals.css";
import awsExports from "../../aws-exports";
import { Amplify } from "aws-amplify";
import { Inter } from "next/font/google";
import Image from "next/image";
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  View,
  Card,
  WithAuthenticatorProps,
} from "@aws-amplify/ui-react";

Amplify.configure({ ...awsExports, ssr: true });
const inter = Inter({ subsets: ["latin"] });

function Home({ signOut, user }: WithAuthenticatorProps) {
  return (
    <View className="Home justify-center">
      <Card>
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          // className="dark:invert"
          width={100}
          height={24}
          priority
        />
        <Button onClick={signOut}>Sign Out</Button>
        <Heading level={1}>Welcome {user?.attributes?.email}</Heading>
      </Card>
    </View>
  );
}
export default withAuthenticator(Home);
