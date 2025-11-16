import { NavLink } from "react-router-dom"

export const Navbar = () =>{
    return(
        <div className="navBar">
            <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")}>
                <p>Home</p>
            </NavLink>
            <NavLink to="/artists" className={({ isActive }) => (isActive ? "active-link" : "")}>
                <p>Artists</p>
            </NavLink>
            <NavLink to="/favorites" className={({ isActive }) => (isActive ? "active-link" : "")}>
                <p>Favorites</p>
            </NavLink>
            <NavLink to="/albums" className={({ isActive }) => (isActive ? "active-link" : "")}>
                <p>Albums</p>
            </NavLink>
        </div>
    )
}