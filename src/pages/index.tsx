import { Inter } from "next/font/google";
import Image from "next/image";
import { Amplify } from "aws-amplify";
import awsExports from "../aws-exports";
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  View,
  Card,
  WithAuthenticatorProps,
} from "@aws-amplify/ui-react";

Amplify.configure(awsExports);

const inter = Inter({ subsets: ["latin"] });

function Home({ signOut, user }: WithAuthenticatorProps) {
  return (
    <View className="Home">
      <Card>
        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          // className="dark:invert"
          width={100}
          height={24}
          priority
        />
        <Heading level={1}>Welcome</Heading>
      </Card>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
}
export default withAuthenticator(Home);
