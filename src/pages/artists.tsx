import { useEffect, useState } from "react"
import { SearchBar} from "../components/searchBar"
import { getToken } from "../methods/getToken"
import { DisplayItem } from "../components/displayItem"
import { SpotifyLink } from "../components/spotifyLink"
import { StarDiagram } from "../components/starDiagram"
import { LocalFavoriteButton } from "../components/favoritesComponents"
import { useUrlParmas } from "../hooks/urlParmas"


export const Artists = () => {
    const [artistData,setArtistData] = useState<null | any>(null)
    const [artistAlbums, setArtistAlbums] = useState<null | any>(null)
    const [artistTracks, setArtistTracks] = useState<null | any>(null)

    const searchId = useUrlParmas("search")
    useEffect(() => {
        if (searchId){
            getArtistDataFromId(searchId)
        }
    },[useUrlParmas])

    const getArtistData = async (text: string) => {
        const token = await getToken()
        const res = await fetch(
            `https://api.spotify.com/v1/search?q=${encodeURIComponent(text)}&type=artist&limit=1`,
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );
        const jsonFile = await res.json()
        const artist = jsonFile.artists.items[0]
        setArtistData(artist)
        console.log(artist)
        const albumRes = await fetch(
            `https://api.spotify.com/v1/artists/${artist.id}/albums?limit=3`,
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );
        const albumJson = await albumRes.json()
        const albums = albumJson.items
        setArtistAlbums(albums)

        const tracksRes = await fetch(
            `https://api.spotify.com/v1/artists/${artist.id}/top-tracks`,
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        )
        const trackJson = await tracksRes.json()
        const tracks = trackJson.tracks.slice(0,9)
        setArtistTracks(tracks)
    }

    const getArtistDataFromId = async (id: string) => {
        const token = await getToken()
        const res = await fetch(
            `https://api.spotify.com/v1/artists/${id}`,
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );
        const jsonFile = await res.json()
        console.log(jsonFile)
        const artist = jsonFile
        setArtistData(artist)
        console.log(artist)
        const albumRes = await fetch(
            `https://api.spotify.com/v1/artists/${id}/albums?limit=3`,
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );
        const albumJson = await albumRes.json()
        const albums = albumJson.items
        setArtistAlbums(albums)

        const tracksRes = await fetch(
            `https://api.spotify.com/v1/artists/${id}/top-tracks`,
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        )
        const trackJson = await tracksRes.json()
        const tracks = trackJson.tracks.slice(0,9)
        setArtistTracks(tracks)
    }

    const [trackListExpnaded,setTrackListExpanded] = useState<boolean>(false)

    return (
        <div className="artistsPage pageContent">
            <h1>Search the artist of your desire</h1>
            <h2>And get all the information about them</h2>
            <br />
            <SearchBar textPlaceholder="Enter Artist's Name..." onSubmit={getArtistData} />
            {
                artistData!==null? 
                <div className="post">
                    <p style={{textAlign:"right"}}> <LocalFavoriteButton type="artist" id={artistData.id} name={artistData.name} imgURL={artistData.images[1].url}/> </p>
                    <p style={{textAlign: "center"}}>
                        <img src={artistData.images[0].url} alt="Artist Image" className="postImg" />
                    </p>
                    <h1 style={{textAlign: "center"}}>{artistData.name}</h1>
                    <p>Followers: <b>{artistData.followers.total.toLocaleString()}</b></p>
                    <p>Popularity: <b>{artistData.popularity}/100</b> <StarDiagram procentage={artistData.popularity}/></p>
                    {artistData.genres.length > 0?
                    <>
                        <p>Genres:</p>
                        <ul>
                            {artistData.genres?.map((genre: string) =>( <li key={genre}><b>{genre}</b></li>))}
                        </ul>
                    </>
                    :<></>}
                    {artistAlbums !== null && artistAlbums.length > 0?
                    <>
                        <p>Most Recent Albums:</p>
                        <ul className="displayList">
                            {artistAlbums.map((album: any) =>{
                                const linkString = `/albums?search=${album.id}`
                                return(
                                    <DisplayItem
                                        key={album.id}
                                        link={linkString} 
                                        imgUrl={album.images[1].url} 
                                        text={album.name} 
                                        itemClass="albumItem"
                                        shouldDisply={true}
                                    />
                                )
                            })}
                        </ul>
                    </>: <></>}
                    {artistTracks !== null && artistTracks.length > 0?
                    <>
                        <p>Top Tracks:</p>
                        <ul className="displayList">
                            {artistTracks.map((track: any, index: number) =>{
                                const linkString = `/tracks?search=${track.id}`
                                const isExtra = index >= 3
                                if(isExtra){
                                    return(
                                        <DisplayItem 
                                            link={linkString} 
                                            imgUrl={track.album.images[1].url} 
                                            text={track.name} 
                                            itemClass="trackItem" 
                                            shouldDisply={trackListExpnaded}
                                        />
                                    )
                                } else {
                                    return(
                                        <DisplayItem 
                                            link={linkString} 
                                            imgUrl={track.album.images[1].url} 
                                            text={track.name} 
                                            itemClass="trackItem" 
                                            shouldDisply={true}
                                        />
                                    )
                                }
                            })}
                        </ul>
                        <p style={{textAlign:"center"}}><button onClick={()=>setTrackListExpanded(!trackListExpnaded)} className="defaultBTN">{trackListExpnaded? "▲" : "▼"}</button></p>
                    </>: <></>}
                    <p style={{textAlign:"center", marginTop:"20px"}}><SpotifyLink urlLink={artistData.external_urls.spotify} text="See on"/></p>
                </div> : <></>
            }
        </div>
    )
}