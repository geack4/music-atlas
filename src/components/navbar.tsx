import { NavLink } from "react-router-dom"

export const Navbar = () =>{
    return(
        <div className="navBar">
            <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")}>
                <p>Home</p>
            </NavLink>
        </div>
    )
}