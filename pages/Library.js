import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

function Library() {
  const [libraryId, setLibraryId] = useState("tracks");
  const [playlists, setPlaylists] = useState([]);
  const [type, setType] = useState("track");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://v1.nocodeapi.com/shubhendra_pandey/spotify/aGMTBhxgCzKoPdPz/myLibrary?type=${libraryId}`)
        .then((res) => res.json())
        .then((res) => setPlaylists(res.items))
    }
    fetchData();
  }, [libraryId]);


  // console.log(playlists);  

  return (
    <div className="bg-white h-screen overflow-y-scroll text-white ">
      <NavBar />
      <div className="overflow-auto">
        <div className="flex mt-1">
          <h1 className="p-4 text-3xl font-bold text-black">Your Library :</h1>
          <button className="bg-gray-500 px-4 rounded-lg mx-3" onClick={() => setLibraryId("tracks")}>Tracks</button>
          <button className="bg-gray-500 px-4 rounded-lg mx-3" onClick={() => setLibraryId("albums")}>Albums</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 m-3 ">
          {playlists?.map((playlist, i) => (

            (playlist?.track?.type === "track") ? (
              <div key={playlist?.track?.id} className="m-3 bg-white border-8 rounded-md transition ease-in duration-150 transform hover:scale-105 md:hover:scale-110">
                <img src={playlist?.track?.album?.images?.[0]?.url} alt="" />
                <div className="p-2 text-black">
                <p className="">
                    <b>Artist</b> : {playlist?.track?.artists[0].name}
                  </p>
                  <p className="">
                    <b>track</b> : {playlist?.track?.name}
                  </p>
                </div>
              </div>
            ) : (
              <div key={playlist?.album?.id} className="m-3 bg-white border-8 rounded-md transition ease-in duration-150 transform hover:scale-105 md:hover:scale-110">
                <img src={playlist?.album?.images?.[0]?.url} alt="" />
                <div className="p-2 text-black">
                  <p className="">
                    <b>Album</b> : {playlist?.album?.name}
                  </p>
                </div>
              </div>
            )
          ))}

        </div>
      </div>
    </div>
  )
}

export default Library;