import  SpotifyLogo  from "../assets/spotify-assets/Full_Logo_Green_RGB.svg?react";

export const Home = () => {
    return (
        <div className="homePage pageContent">
            <h1>Music Atlas</h1>
            <h3>Expolre the world of music that <SpotifyLogo className="spotifyLogo" /> provides</h3>
        </div>
    )
}