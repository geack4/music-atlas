import { useEffect, useState } from "react"
import { useUrlParmas } from "../hooks/urlParmas"
import { getToken } from "../methods/getToken"
import { SearchBar } from "../components/searchBar"
import { LocalFavoriteButton } from "../components/favoritesComponents"
import { Link } from "react-router-dom"
import { formatDate, msToMMSS } from "../methods/dateFormatting"
import { StarDiagram } from "../components/starDiagram"

export const Tracks = () => {
    const [trackData, setTrackData] = useState<null | any>(null)
    const [audioFeatures, setAudioFeatures] = useState<null | any>(null)

    const searchId = useUrlParmas("search")
    useEffect(()=>{
        if (searchId){getTrackData(searchId,true)}
    },[useUrlParmas])

    const getTrackData = async (text: string, textIsId: boolean = false) =>{
        const token = await getToken()
        let trackId:any = false
        if (textIsId){
            trackId = text
        } else {
            const res = await fetch(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(text)}&type=track&limit=1`,
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                }
            );
            const jsonFile = await res.json()
            console.log(jsonFile)
            trackId = jsonFile?.tracks?.items?.[0]?.id;
        }
        const detailsRes = await fetch(
            `https://api.spotify.com/v1/tracks/${encodeURIComponent(trackId)}`,
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        )

        const detailsJson = await detailsRes.json()
        setTrackData(detailsJson)
        console.log("details")
        console.log(detailsJson)

        const featuresRes = await fetch(
  `https://api.spotify.com/v1/audio-features/${trackId}`,
  { headers: { Authorization: `Bearer ${token}` } }
)
        const featuresJson = await featuresRes.json()
        setAudioFeatures(featuresJson)
        console.log("features")
        console.log(featuresJson)
    }

    return (
        <div className="pageContent trackPage">
            <h1>Search the track of your desire</h1>
            <h2>And get all the information about it</h2>
            <br />
            <SearchBar textPlaceholder="Enter Album's Name..." onSubmit={getTrackData} />
            {trackData!==null? <div className="post">
                <p style={{textAlign:"right"}}> <LocalFavoriteButton type="track" id={trackData.id} name={trackData.name} imgURL={trackData.album.images[1].url}/></p>
                                <p style={{textAlign: "center"}}>
                    <img src={trackData.album.images[0].url} alt="Album Image" className="postImg" />
                </p>
                <h1 style={{textAlign: "center"}}>{trackData.name}</h1>
                <h4 style={{textAlign: "center", marginTop:"5px"}}>
                    {trackData.artists.map((artist: any, index: number) => {
                        const link = `/artists?search=${artist.id}`
                        return (
                        <span key={artist.id}>
                        <Link to={link} className="artistLinkText">
                            <b>{artist.name}</b>
                        </Link>
                        {index < trackData.artists.length - 1 && ", "}
                        </span>
                        )
                    })}
                </h4>
                {trackData.explicit && <h5 style={{textAlign: "center", margin:"8px 0"}}>
                    <span style={{backgroundColor:"rgba(0,0,0,0.25)",padding:"2px 6px",borderRadius:"10px"}}>Explicit</span>
                </h5>}
                <br />
                <p>Album: {" "}
                    <Link 
                    to={`/albums?search=${trackData.album.id}`} 
                    className="albumLinkText">
                        <span className={`album-${trackData.album.album_type} apply-text`} style={{fontWeight:"bolder"}}>{trackData.album.name}</span>
                    </Link>
                </p>
                <p>Lenght: <b>{msToMMSS(trackData.duration_ms)}</b>min <span style={{fontSize:"10px"}}>(Precise: {trackData.duration_ms}ms)</span></p>
                <p>Popularity: <b>{trackData.popularity}/100</b> <StarDiagram procentage={trackData.popularity} /></p>
                <p>Release date: <b>{formatDate(trackData.album.release_date)}</b></p>
                {trackData.preview_url ? (
                    <audio controls src={trackData.preview_url} style={{ width: "100%" }} />
                ) : (
                    <p style={{opacity:0.6}}>No preview available for this track</p>
                )}
                {audioFeatures?.track?.[0] ?
                <>
                    {audioFeatures.track[0].intTotalPlays && <p>Estimated Total Plays: <b>{audioFeatures.track[0].intTotalPlays}</b></p>}
                    {audioFeatures.track[0].strGenre && <p>Genre: <b>{audioFeatures.track[0].strGenre}</b></p>}
                    {audioFeatures.track[0].strMood && <p>Mood: <b>{audioFeatures.track[0].strMood}</b></p>}
                </>
                :
                <p style={{opacity:0.6}}>Couldn't get more information about the track</p>
                }
            </div> : <></>}
        </div>
    )
}