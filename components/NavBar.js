import {
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    RssIcon,
    FireIcon,
    ChatAlt2Icon
} from "@heroicons/react/outline";
import router, { useRouter } from "next/router";
import Image from "next/image";
import RhythmicLogo from "../public/Rhythmic_L1.jpg"

function NavBar() {
    return ( 
    <div className="flex sticky top-0 z-10 justify-between shadow-lg align-middle px-4 h-20 bg-white mb-2">
    <Image 
      className="cursor-pointer"
        src={RhythmicLogo}
        alt="Rhythmic Logo"
        width="180px"
        height="12px"
        onClick={()=> router.push("/")}
    />
        <div className="flex space-x-5 text-gray-500">
            <button onClick={()=> router.push("/Trending")} className="flex items-center space-x-1 hover:text-black">
          <FireIcon className="h-5 w-5 text-yellow-600" />
          <p>Trending</p>
        </button>
        <button onClick={()=> router.push("/Library")} className="flex items-center space-x-2 hover:text-black">
          <LibraryIcon className="h-5 w-5 text-pink-400" />
          <p>Your Library</p>
        </button>
        <button onClick={()=> router.push("/Search")} className="flex items-center space-x-2 hover:text-black">
          <SearchIcon className="h-5 w-5 text-purple-400" />
          <p>Search</p>
        </button>        
        </div>
    </div>
    )
}

export default NavBar;