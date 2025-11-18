import { useState } from "react"
import { DisplayItem } from "../components/displayItem"
import { clearFavorites, getFavorites } from "../components/favoritesComponents"

export const Favorites = () =>{
    const [stored,setStored] = useState(getFavorites())
    const [isEmpty, setIsEmpty] = useState<boolean>(
        stored.artists.length === 0 &&
        stored.tracks.length === 0 &&
        stored.albums.length === 0
    )

    return(
        <div className="pageContent favoritesPage">
            {!isEmpty?
            <>
            <p style={{textAlign:"right"}}><button className="defaultBTN" style={{textAlign:"center", minWidth:0}} onClick={() =>{
                clearFavorites()
                const updated = getFavorites()
                setStored(updated)
                setIsEmpty(
                    updated.artists.length === 0 &&
                    updated.tracks.length === 0 &&
                    updated.albums.length === 0
                )
            }}>❌ Clear Favorites ❌</button></p>
            <ul className="displayList" style={{justifyContent:"space-evenly"}}>
                {stored.artists.map((artist: any) =>{
                    const linkString = `/artists?search=${artist.id}`
                    return(
                        <DisplayItem 
                        key={artist.id}
                        link={linkString} 
                        imgUrl={artist.imgUrl} 
                        text={artist.name} 
                        itemClass="artistItem"
                        shouldDisply={true}
                        />
                    )
                })}
                {stored.albums.map((album: any) =>{
                    const linkString = `/albums?search=${album.id}`
                    return (
                        <DisplayItem
                        key={album.id}
                        link={linkString} 
                        imgUrl={album.imgUrl} 
                        text={album.name} 
                        itemClass="albumItem"
                        shouldDisply={true}
                        />
                    )
                })}
                {stored.tracks.map((track: any) =>{
                    const linkString = `/tracks?search=${track.id}`
                    return (
                        <DisplayItem
                        key={track.id}
                        link={linkString} 
                        imgUrl={track.imgUrl} 
                        text={track.name} 
                        itemClass="trackItem"
                        shouldDisply={true}
                        />
                    )
                })}
            </ul>
            </>
            : <>
            <p>Nothing here yet...</p>
            </>}
        </div>
    )
}