import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
} from "@heroicons/react/outline";

import { HeartIcon } from "@heroicons/react/solid";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playListIdState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";

function Sidebar() {
  const { data: session, status } = useSession();
  const spotifyAPI = useSpotify();
  const [playlists, setPlaylists] = useState([]);
  const [playListId, setPlayListId] = useRecoilState(playListIdState);

  useEffect(() => {
    if (spotifyAPI.getAccessToken()) {
      spotifyAPI
        .getUserPlaylists()
        .then((data) => setPlaylists(data.body.items))
      }
  },[session, spotifyAPI]);
  console.log(playlists)

  return (
    <div className="text-gray-500 p-5 text-xs lg:text-sm border-r-[1px] border-gray-300 scrollbar-hide overflow-y-scroll h-screen sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36">
      <div className="space-y-4">

        <button className="flex items-center space-x-2 hover:text-black">
          <PlusCircleIcon className="h-5 w-5 text-yellow-400" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-black">
          <HeartIcon className="h-5 w-5 text-red-600 " />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-black">
          <RssIcon className="h-5 w-5 text-green-400" />
          <p>Your episode</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />

        {/* Playlists */}
        <div className="space-y-3 scrollbar-hide overflow-y-scroll">
          
        {playlists.map((playlist) => (
          <p
          key={playlist.id}
          onClick={() => setPlayListId(playlist.id)}
          className="cursor-pointer hover:text-black"
          >
            {playlist.name}
          </p>
        ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

