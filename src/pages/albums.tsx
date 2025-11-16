import { useState } from "react"
import { SearchBar } from "../components/searchBar"
import { getToken } from "../methods/getToken"
import { LocalFavoriteButton } from "../components/favoritesComponents"
import { Link } from "react-router-dom"
import { formatDate } from "../methods/dateFormatting"

export const Albums = () =>{
    const [albumData, setAlbumData] = useState<null | any>(null)

    const getAlbumData = async (text:string) => {
        const token = await getToken()
        const res = await fetch(
            `https://api.spotify.com/v1/search?q=${encodeURIComponent(text)}&type=album&limit=1`,
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );
        const jsonFile = await res.json()
        const album = jsonFile.albums.items[0]
        console.log(album)
        setAlbumData(album)
    }

    return (
        <div className="albumPage pageContent">
            <h1>Search the album of your desire</h1>
            <h2>And get all the information about it</h2>
            <br />
            <SearchBar textPlaceholder="Enter Album's Name..." onSubmit={getAlbumData} />
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
                <p>Album type: <span style={{textTransform:"capitalize"}} className={`album-${albumData.album_type}`}>{albumData.album_type}</span></p>
                <p>Release date: {formatDate(albumData.release_date)}</p>
                <p>{albumData.total_tracks}</p>
            </div>
            : 
            <></>}
        </div>
    )
}