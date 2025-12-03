import React, {useContext,} from 'react'
import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import Player from './components/Player/Player'
import Display from './components/Display/Dispaly.jsx'
import { PlayerContext } from './components/context/PlayerContext.jsx'

export default function App() {

  const {audioRef,track} = useContext(PlayerContext);

    return (
      <div className='h-screen bg-black'>
        <div className='h-[90%] flex'>
          <Sidebar/>
          <Display />
        </div>
        <Player/>
        <audio ref={audioRef} src={track.file} preload='auto'></audio>
      </div>
  )
}
