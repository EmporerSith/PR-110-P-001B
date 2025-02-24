import React, { useContext } from "react";

import Player from "./components/Player";
import Display from "./components/Display";
import { PlayerContext } from "./context/PlayerContext";
import Sidebar from "./components/Sidebar";

const App = () => {
  const { audioRef, track } = useContext(PlayerContext);
  return (
    <div className="h-screen bg-black">
      <div className="h-[90%] flex">
        <Sidebar />
        <Display />
      </div>
      <Player />
      <audio ref={audioRef} preload="auto" className="" src={track.file}></audio>
    </div>
  );
};

export default App;
