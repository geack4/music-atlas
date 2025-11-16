import  SpotifyLogo  from "../assets/spotify-assets/Full_Logo_White_RGB.svg?react";

interface Params{
    urlLink: string,
    text: string
}

export const SpotifyLink = (params: Params) =>{
    return(
    <button onClick={() => window.open(params.urlLink,"_blink")} className="spotifyLink">
        {params.text} <SpotifyLogo className="spotifyLogo"/>
    </button>
    )
}