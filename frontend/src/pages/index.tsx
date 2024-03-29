import Head from "next/head";
import { Archivo } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Chat from "./components/Chat";

const inter = Archivo({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Chat - Júlio Moraes</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/paper.svg" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Chat></Chat>
      </main>
    </>
  );
}
