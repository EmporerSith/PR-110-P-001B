import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();
const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const playWithId = async (id) => {
    await setTrack(songsData[id]);
    await audioRef.current.play();
    setPlayStatus(true);
  };

  const previous = async () => {
    if (track.id > 0) {
      await setTrack(songsData[track.id - 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const next = async () => {
    if (track.id < songsData.length - 1) {
      await setTrack(songsData[track.id + 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const seekSong = async (e) => {
    audioRef.current.currentTime = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
  };

  useEffect(() => {
    const updateTime = () => {
      if (audioRef.current && !isNaN(audioRef.current.duration)) {
        setTime({
          currentTime: {
            second: String(Math.floor(audioRef.current.currentTime % 60) || 0).padStart(2, "0"),
            minute: Math.floor(audioRef.current.currentTime / 60) || 0,
          },
          totalTime: {
            second: String(Math.floor(audioRef.current.duration % 60) || 0).padStart(2, "0"),
            minute: Math.floor(audioRef.current.duration / 60) || 0,
          },
        });

        seekBar.current.style.width =
          Math.floor((audioRef.current.currentTime / audioRef.current.duration) * 100) + "%";
      }
    };

    if (audioRef.current) {
      audioRef.current.ontimeupdate = updateTime;
      audioRef.current.onloadedmetadata = updateTime; // Trigger update on metadata load
    }
  }, [audioRef]);

  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
  };
  return <PlayerContext.Provider value={contextValue}>{props.children}</PlayerContext.Provider>;
};
export default PlayerContextProvider;
