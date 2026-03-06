import {NavLink} from "react-router-dom";
import "./Header.scss"

export const Navbar = () => {
    return (
        <nav className="nav-links">
            <NavLink className={({isActive}) => (isActive ? "active-link" : "")} to="/">
                <span>Купить</span>
            </NavLink>
            <NavLink className={({isActive}) => (isActive ? "active-link" : "")} to="/my-esims">
                <span>Мои eSim</span>
            </NavLink>
            <NavLink className={({isActive}) => (isActive ? "active-link" : "")} to="/cards">
                <span>Транзакции</span>
            </NavLink>
        </nav>
    );
};
