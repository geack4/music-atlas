import { Link } from "react-router-dom"

interface Params{
    link: string,
    imgUrl: string,
    text: string,
    itemClass: string,
    shouldDisply: boolean
}

export const DisplayItem = (params: Params) =>{
    return(
    <Link to={params.link} style={{display: params.shouldDisply? "inherit":"none"}}>
    <li key={params.text} className={params.itemClass}>
        <img src={params.imgUrl} alt={params.text} />
        <p>{params.text}</p>
    </li>
    </Link>)
}

interface TrackParams{
    link: string,
    imgUrl: string,
    text: string,
    itemClass: string,
    shouldDisply: boolean,
    trackNumber: number | null,
}

export const AlbumTrackDisplayItem = (params: TrackParams) =>{
    return(
    <Link to={params.link} style={{display: params.shouldDisply? "inherit":"none"}}>
    <li key={params.text} className={params.itemClass}>
        <img src={params.imgUrl} alt={params.text} />
        {params.itemClass === "trackItem"? <p style={{fontFamily:"monospace", fontWeight:"bold",marginBottom:"3px", textShadow:"0 0 3px black"}}>Track No.{params.trackNumber}</p> : <></>}
        <p>{params.text}</p>
    </li>
    </Link>)
}