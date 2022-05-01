import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";


const Header = (props) => {
    return (
        <header className={s.header}>
            <img src="https://w7.pngwing.com/pngs/662/202/png-transparent-dragon-day-spa-logo-art-dragon-logo-legendary-creature-mammal-carnivoran.png" alt="Coca-cola"/>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? <div> {props.login} - <button onClick={props.logout}>Logout</button></div>
                    : <NavLink to={'/login'}>Login</NavLink>}

            </div>
        </header>
    )
}

export default Header