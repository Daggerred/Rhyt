import SpotifyPlayer from 'react-spotify-web-playback'
import { useEffect, useState, useCallback } from 'react'
import { debounce } from "lodash"

function SearchPlayer({accessToken , trackUri}){
    const [play, setPlay] = useState(false);
    const [volume, setVolume] = useState(20);
    
    useEffect(()=> setPlay(true), [trackUri])

    const debounceAdjustVolume = useCallback(
        debounce((volume) => {
          spotifyApi.setVolume(volume).catch((err) => {});
        }, 500),
        []
    );

    if(!accessToken) return null
    return <SpotifyPlayer 
        token={accessToken}
        showSaveIcon
        styles={{
            activeColor: '#c026d3',
            bgColor: '#9ca3af',
            color: '#000',
            loaderColor: '#fff',
            sliderColor: '#c026d3',
            trackArtistColor: '#000',
            trackNameColor: '#fff',
            height:'53px',
            sliderHeight: '8px',
            sliderTrackBorderRadius: '10px'
        }}
        initialVolume={volume}
        callback={state => {
        if(!state.isPlaying) setPlay(false)
        }}
        play={play}
        uris={trackUri ? [trackUri] : []}
    />
}

export default SearchPlayer;