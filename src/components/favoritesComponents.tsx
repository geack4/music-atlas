import { useEffect, useState } from "react"

interface StoredObject{
    id: string,
    imgUrl: string,
    name: string,
}

interface StoredObjectWithType{
    type: string;
    id: string;
    name: string;
    imgURL: string;
}

interface FavoritesTable {
  artists: StoredObject[];
  tracks: StoredObject[];
  albums: StoredObject[];
}

export const getFavorites = (): FavoritesTable => {
    let stored = localStorage.getItem("favoritesTable");
    if (!stored) {
        const initial = { artists: [], tracks: [], albums: [] };
        localStorage.setItem("favoritesTable", JSON.stringify(initial));
        stored = JSON.stringify(initial);
    }
    return JSON.parse(stored);
};

export const clearFavorites = () => {
    const initial = { artists: [], tracks: [], albums: [] };
    localStorage.setItem("favoritesTable", JSON.stringify(initial));
}

export const addEntry = (params: StoredObjectWithType) =>{
    const stored = getFavorites()
    const newObject: StoredObject = {
        id: params.id,
        imgUrl: params.imgURL,
        name: params.name
    }

    switch (params.type) {
        case "artist":
            stored.artists.push(newObject)
            break;
        case "track":
            stored.tracks.push(newObject)
            break;
        case "album":
            stored.albums.push(newObject)
            break;
        default:
            console.log("Ensure you've typed correct type while adding to favorites")
    }

    localStorage.setItem("favoritesTable",JSON.stringify(stored))
}

export const removeEntry = (params: StoredObjectWithType) =>{
    const stored = getFavorites() as FavoritesTable
    const idToRemove = params.id

    switch (params.type) {
        case "artist":
            stored.artists = stored.artists.filter(obj => obj.id !== idToRemove)
            break;
            case "track":
            stored.tracks = stored.tracks.filter(obj => obj.id !== idToRemove)
            break;
        case "album":
            stored.albums = stored.albums.filter(obj => obj.id !== idToRemove)
            break;
        default:
            console.log("Ensure you've typed correct type while removing from favorites")
    }

    localStorage.setItem("favoritesTable",JSON.stringify(stored))

}


export const LocalFavoriteButton = (params: StoredObjectWithType) => {
    const stored = getFavorites() as FavoritesTable
    const [active, setActive] = useState<boolean>(false)
    
    const checkFavorites = () =>{
        const localStored = getFavorites() as FavoritesTable
        switch (params.type) {
            case "artist":
                setActive(localStored.artists.some((obj) => obj.id === params.id));
                break;
            case "track":
                setActive(localStored.tracks.some((obj) => obj.id === params.id));
                break;
            case "album":
                setActive(localStored.albums.some((obj) => obj.id === params.id));
                break;
            default:
                console.log("broke")
        }
    }
    useEffect(() =>{
        checkFavorites()
    },[params.id,params.type])

    return (<button onClick={()=>{
        if (active){
            removeEntry(params)
        }else{
            addEntry(params)
        }
        checkFavorites() 
    }} className="favortieBTN">
        <span className="star" style={{backgroundColor: active? "gold":"black"}} ></span>
    </button>)
}