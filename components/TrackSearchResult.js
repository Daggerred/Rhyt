function TrackSearchResult({ track, chooseTrack }) {
    function handlePlay() {
        chooseTrack(track)
    }

    return (
        <div onClick={handlePlay} className="flex m-3 cursor-pointer items-center hover:bg-gray-300 transition-all ease-in-out p-2 rounded-md">
            <img
                className="inline h-10 w-10"
                src={track.albumUrl}
                alt=""
            />
            <div className="ml-3">
                <div>{track.title}</div>
                <div className="text-gray-500 font-semibold">{track.artist}</div>
            </div>
        </div>
    )
}

export default TrackSearchResult;