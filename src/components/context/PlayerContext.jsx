import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../../assets/assets";

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
    const newId = track.id === 0 ? songsData.length - 1 : track.id - 1;

    await setTrack(songsData[newId]);
    await audioRef.current.play();
    setPlayStatus(true);
  };

  const next = async () => {
    const newId = track.id === songsData.length - 1 ? 0 : track.id + 1;

    await setTrack(songsData[newId]);
    await audioRef.current.play();
    setPlayStatus(true);
  };

  const seekSong = async (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleTimeUpdate = () => {
      const duration = audio.duration;
      const current = audio.currentTime;

      // اگر هنوز duration لود نشده → هیچی رندر نکن
      if (isNaN(duration) || isNaN(current) || duration === 0) return;

      // بروزرسانی seek bar
      seekBar.current.style.width =
        Math.floor((current / duration) * 100) + "%";

      // بروزرسانی زمان
      setTime({
        currentTime: {
          second: Math.floor(current % 60),
          minute: Math.floor(current / 60),
        },
        totalTime: {
          second: Math.floor(duration % 60),
          minute: Math.floor(duration / 60),
        },
      });
    };

    // ثبت ایونت
    audio.addEventListener("timeupdate", handleTimeUpdate);

    // پاکسازی ایونت برای جلوگیری از چندبار ثبت شدن
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audioRef]);

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
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

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
