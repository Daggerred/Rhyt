import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import router, { useRouter } from "next/router";

function Trending () {
    const [data, SetData] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`https://v1.nocodeapi.com/shubhendra_pandey/spotify/aGMTBhxgCzKoPdPz/browse/new`)
            .then((res) => res.json())
            .then((res) => SetData(res?.albums?.items));
        }
        fetchData();
    }, []);

    return (
    <div className="bg-white">
        <NavBar />
        <div className="text-white h-full overflow-auto">
            <h1 className="text-3xl text-center font-bold text-gray-500 mt-2">🔥 Trending Today 🔥</h1>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 m-3">
            {data?.map((res,i)=>(
                <div key={i} className="m-3 bg-white border-8 rounded-md transition ease-in duration-150 transform hover:scale-105 md:hover:scale-110">
                        <img src={res?.images?.[0]?.url} alt=""/>
                        <div className="p-2 text-black">
                            <p className="overflow-x-hidden"><b>Name</b> : {res.artists[0].name}</p>
                            <p className="">
                               <b>Album</b> : {res.name}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    ) 
}

export default Trending;