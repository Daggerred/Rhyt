import { getSession } from "next-auth/react";
import Head from "next/head";
import Center from "../components/Center";
import NavBar from "../components/NavBar";
// import Player from "../components/Player";
import Sidebar from "../components/Sidebar";

export default function Home() {
  
  return (
    <div className="bg-white h-screen overflow-hidden">
      <Head>
        <title>Rhythmic 🎶</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <NavBar /> 
      <main className="flex">
        <Sidebar />
        <Center />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
