import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className='max-w-[500px] w-full m-auto flex flex-col gap-4'>
      <Link to={'/video-all'} className='btn block'>Video</Link>
      <Link to={'/livecam-all'} className='btn block'>Live Cam</Link>
      <Link to={'/actor-all'} className='btn block'>Actor</Link>
      <Link to={'/hentai-all'} className='btn block'>Hentai</Link>
      <Link to={'/book-all'} className='btn block'>Book</Link>
      <Link to={'/website-all'} className='btn block'>Website</Link>
    </div>
  )
}

export default HomePage