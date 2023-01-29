import NavBar from "../components/NavBar";
import {
    SearchIcon,
} from "@heroicons/react/solid";
import { useState, useEffect } from 'react';
import useSpotify from "../hooks/useSpotify";
import TrackSearchResult from "../components/TrackSearchResult";
import SearchPlayer from "../components/SearchPlayer";
import lyricsFinder from 'lyrics-finder';

function Search() {
    const spotifyApi = useSpotify();
    const accessToken = spotifyApi.getAccessToken()
    const [search, setSearch] = useState("");
    const [searchVal, setSearchVal] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();
    const [lyrics, setLyrics] = useState("");
    console.log(lyrics)

    function chooseTrack(track) {
        setPlayingTrack(track);
        setLyrics("");
    }

    function handleClick(e) {
        e.preventDefault();
        setSearch(searchVal);
    }

    useEffect(() => {
        if (!playingTrack) return
        async function fetchData() {
            const response = await fetch(`https://api.lyrics.ovh/v1/${playingTrack.artist}/${playingTrack.title}`)
                .then((res) => res.json())
                .then((res) => setLyrics(res.lyrics))
                .catch(err => console.log(err))
        }
        fetchData()
    }, [playingTrack])

    
    useEffect(() => {
        if (!search) return setSearchResults([]);
        if (!accessToken) return

        // let cancel = false
        spotifyApi.searchTracks(search).then((res) => {
            // if (cancel) return
            // console.log(res)
            setSearchResults(res.body.tracks.items.map(track => {
                const smallestAlbumImage = track.album.images.reduce((smallest, image) => {
                    if (image.height < smallest.height) return image
                    return smallest
                }, track.album.images[0])

                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: smallestAlbumImage.url,
                }
            }))
        })

        // return () => cancel = true;
    }, [search, accessToken])

    // console.log(searchResults)

    return (
        <div className="bg-white h-screen text-black overflow-y-hidden">
            <NavBar />

            <div className="flex">
                <div className="w-4/6 h-[48rem]">
                    <div className="flex justify-center w-full py-3 bg-white">
                        <input className="p-3 rounded-lg border-2 focus:outline-none text-gray-500 font-bold w-72" type="text" placeholder="Search Artist/Songs"
                            value={searchVal} onChange={e => setSearchVal(e.target.value)} />
                        <button className="bg-blue-500 text-white p-3 rounded-md ml-2 cursor-pointer" onClick={(e) => handleClick(e)}>Search</button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {searchResults.map(track => (
                            <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack} />
                        ))}
                    </div>
                </div>
                <div className="h-[48rem] w-2/6 bg-gray-600 overflow-y-scroll">
                    <p className="text-center font-bold text-4xl bg-white text-gray-500 text p-4 z-30 fixed w-2/6 scrollbar-hide">Lyrics</p>
                    <div className="text-center mt-20 whitespace-pre font-semibold text-white">
                        {
                            (lyrics) ? (lyrics) : "No Lyrics Found"
                        }
                    </div>
                    <div className="absolute bottom-0 z-30 w-2/6 p-1">
                        <div className="">
                            <SearchPlayer
                                accessToken={accessToken} trackUri={playingTrack?.uri} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search;
