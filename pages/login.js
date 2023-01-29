import { getProviders, signIn } from "next-auth/react";
import RhythmicLogo from "../public/Rhythmic_L1.jpg"
import Image from "next/image"

function Login({ providers }) {
  return (
    <div className="flex flex-col bg-white min-h-screen justify-center items-center">
      <Image
        className="w-52 mb-5"
        // src="https://links.papareact.com/9xl"
        src={RhythmicLogo}
        alt="spotify-icon"
      />

      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-[#9d35ce] text-white p-5 rounded-lg"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Login with Rhythmic 🎧
          </button>
        </div>
      ))}
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
