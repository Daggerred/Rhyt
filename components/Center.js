import { LogoutIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playListIdState, playListState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";
import Player from "../components/Player";
import SearchPlayer from "./SearchPlayer";
import { currentTrackUri } from "../atoms/songAtom";

const colors = [
  "from-gray-500",
  "from-indigo-500",
  "from-blue-500",
  "from-yellow-400",
  "from-green-500",
  "from-blue-400",
  "from-purple-500",
  "from-pink-400",
  "from-[#f43f5e]",
  "from-[#059669]",
];

function Center() {
  const { data: session } = useSession();
  const spotifyAPI = useSpotify();
  const [color, setColor] = useState(null);
  const playListId = useRecoilValue(playListIdState);
  const [playList, setPlayList] = useRecoilState(playListState);
  const trackUri = useRecoilValue(currentTrackUri);
  
  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playListId]);

  useEffect(() => {
    spotifyAPI
      .getPlaylist(playListId)
      .then((data) => {
        setPlayList(data.body);
      })
      .catch((error) => console.log("Something went wrong!", error));
  }, [spotifyAPI, playListId]);

  // console.log(session)

  return (
    <div className="flex-grow h-screen scrollbar-hide overflow-y-scroll">
      <div className="sticky top-0">

        <header className="absolute top-5 right-8">
          <div
            className="flex items-center text-white bg-gray-600 space-x-3 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
            onClick={signOut}
          >
            <img
              className="rounded-full w-10 h-10"
              src={session?.user.image}
              alt=""
            />
            <h2 className="text-semibold">{session?.user.name}</h2>
            <LogoutIcon className="h-5 w-5" />
          </div>
        </header>

        <section
          className={`flex items-end space-x-7 bg-gradient-to-b ${color} to-white h-80 text-gray-600 p-8 `}
        >
          <img
            className="h-32 w-32 md:h-44 md:w-44 shadow-2xl"
            src={playList?.images?.[0]?.url}
            alt=""
          />

          <div>
            <p>PLAYLIST</p>
            <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
              {playList?.name}
            </h1>
            <p className="text-xs font-light mt-2">
              Likes : {playList?.followers.total} -{" "}
              {playList?.tracks.items.length} Songs
            </p>
          </div>
        </section>
      </div>

      {/* Songs */}
      <div>
        <Songs />
      </div>


      {/* <Player /> */}
      <div className="sticky bottom-20 py-2">
        {/* <Player /> */}
        <SearchPlayer accessToken={spotifyAPI.getAccessToken()} trackUri={trackUri}/>
      </div>
    </div>
  );
}

export default Center;
