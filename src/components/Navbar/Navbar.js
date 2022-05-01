import React from "react";
import s from './Navbar.module.css'
import {NavLink} from "react-router-dom";

const active = ({ isActive }) => isActive ? s.active : undefined

const Navbar = () => {
    return (
        <nav className={s.nav}>
            <div className={s.item}>
                <NavLink to='/profile' className={active}>
                    Profile
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/dialogs' className={active}>
                    Messages
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/users' className={active}>
                    Users
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/news' className={active}>
                    News
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/music' className={active}>
                    Music
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/settings' className={active}>
                    Settings
                </NavLink>
            </div>
            <div className={s.item}>
                <NavLink to='/games' className={active}>
                    Games
                </NavLink>
            </div>

        </nav>
    )
}

export default Navbar;