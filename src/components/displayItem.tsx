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