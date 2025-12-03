import React, { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import DispalyHome from '../DisplayHome/DisplayHome.jsx'
import DisplayAlbum from '../DisplayAlbum/DisplayAlbum.jsx'
import { albumsData } from '../../assets/assets.jsx';

export default function Dispaly() {

  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.slice(-1) : "";
  const bgColor = albumsData[Number(albumId)].bgColor;

  useEffect(() => {
    if(isAlbum){
      displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`
    }
    else{
      displayRef.current.style.background = `#121212`
    }
  })

  return (
    <div ref={displayRef} className='w-full m-2 px-6 pt-4 rounded-lg bg-[#121212] text-white
    overflow-auto lg:w-[75%] lg:ml-0'>
        <Routes>
            <Route path='/' element={<DispalyHome/>} />
            <Route path='/album/:id' element={<DisplayAlbum />} />
        </Routes>
    </div>
  )
}
