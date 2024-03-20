import React from 'react'

const Navmenu = () => {
  return (
    <div>
         <a href='/home'>
                <img src="/images/home-icon.svg" alt="Home"></img>
                <span>HOME</span>
            </a>
            <a href='/search'>
                <img src="/images/search-icon.svg" alt="Home"></img>
                <span>SEARCH</span>
            </a>
            <a href='/watchlist'>
                <img src="/images/watchlist-icon.svg" alt="Home"></img>
                <span>WATCHLIST</span>
            </a>
            <a href='/originals'>
                <img src="/images/original-icon.svg" alt="Home"></img>
                <span>ORIGINALS</span>
            </a>
            <a href='/movies'>
                <img src="/images/movie-icon.svg" alt="Home"></img>
                <span>MOVIES</span>
            </a>
            <a href='/series'>
                <img src="/images/series-icon.svg" alt="Home"></img>
                <span>SERIES</span>
            </a>

    </div>
  )
}

export default Navmenu