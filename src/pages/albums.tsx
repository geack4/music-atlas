import { useEffect, useState } from "react"
import { SearchBar } from "../components/searchBar"
import { getToken } from "../methods/getToken"
import { LocalFavoriteButton } from "../components/favoritesComponents"
import { Link, useSearchParams } from "react-router-dom"
import { formatDate } from "../methods/dateFormatting"
import { StarDiagram } from "../components/starDiagram"
import { AlbumTrackDisplayItem, DisplayItem } from "../components/displayItem"
import { useUrlParmas } from "../hooks/urlParmas"
import { SpotifyLink } from "../components/spotifyLink"

export const Albums = () =>{
    const [albumData, setAlbumData] = useState<null | any>(null)
    const [message,setMessage] = useState<string>("")

    const searchId = useUrlParmas("search")
    useEffect(()=>{
        if (searchId){getAlbumData(searchId,true)}
    },[useUrlParmas])


    const getAlbumData = async (text:string, textIsId: boolean = false) => {
        const token = await getToken()

        let albumId:any = false
        if (textIsId){
            albumId = text
        } else {
            const res = await fetch(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(text)}&type=album&limit=1`,
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                }
            );
            const jsonFile = await res.json()
            albumId = jsonFile?.albums?.items?.[0]?.id;
            if(!albumId){
                setMessage("No albums found")
                return
            } else {
                setMessage("")
            }
            console.log(albumId)
        }
        

        const detailsRes = await fetch(
            `https://api.spotify.com/v1/albums/${encodeURIComponent(albumId)}`,
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        )

        const detailsJson = await detailsRes.json()
        setAlbumData(detailsJson)
        console.log("details")
        console.log(detailsJson)
    }

    return (
        <div className="albumPage pageContent">
            <h1>Search the album of your desire</h1>
            <h2>And get all the information about it</h2>
            <br />
            <SearchBar textPlaceholder="Enter Album's Name..." onSubmit={getAlbumData} />
            <p>{message}</p>
            {albumData!==null? 
            <div className="post">
                <p style={{textAlign:"right"}}> <LocalFavoriteButton type="album" id={albumData.id} name={albumData.name} imgURL={albumData.images[1].url}/> </p>
                <p style={{textAlign: "center"}}>
                    <img src={albumData.images[0].url} alt="Album Image" className="postImg" />
                </p>
                <h1 style={{textAlign: "center"}}>{albumData.name}</h1>
                <p>
                    Artist{albumData.artists.length > 1? "s":""}:{" "}
                      {albumData.artists.map((artist: any, index: number) => {
                        const link = `/artists?search=${artist.id}`
                        return (
                        <span key={artist.id}>
                        <Link to={link} className="artistLinkText">
                            <b>{artist.name}</b>
                        </Link>
                        {index < albumData.artists.length - 1 && ", "}
                        </span>
                        )
                    })}
                </p>
                <p>Popularity: <b>{albumData.popularity}/100</b> <StarDiagram procentage={albumData.popularity}/></p>
                {albumData.label? 
                    <p>
                        Label: <b>{albumData.label}</b>
                    </p>
                    :
                    <></>
                }
                <p>Album type: <span style={{textTransform:"capitalize"}} className={`album-${albumData.album_type}`}>{albumData.album_type}</span></p>
                {albumData.genres.length>0?
                    <ul>
                        {albumData.genres.map((genre: any, index:number) =>{
                            <li key={index}>{genre}</li>
                        })}
                    </ul>
                    :
                    <></>
                }
                <p>Release date: <span style={{fontFamily:"monospace", fontSize:"17px",fontWeight:"bolder"}}>{formatDate(albumData.release_date)}</span></p>
                {albumData.total_tracks > 1?
                <>
                <h2 style={{textAlign:"center",margin:"15px 0"}}>Album Content</h2>
                <ul className="displayList">
                        {                    
                        albumData.tracks.items.map((track: any, index: number) =>{
                            const linkString = `/tracks?search=${track.id}`
                            return(
                                <AlbumTrackDisplayItem 
                                link={linkString} 
                                imgUrl={albumData.images[1].url} 
                                text={track.name} 
                                itemClass="trackItem" 
                                shouldDisply={true}
                                trackNumber={track.track_number}
                                />
                            )
                        })}
                </ul>
                </>
                :
                <></>
                }
                <p style={{textAlign:"center", marginTop:"20px"}}><SpotifyLink urlLink={albumData.external_urls.spotify} text="Listen on"/></p>
            </div>
            : 
            <></>}
        </div>
    )
}