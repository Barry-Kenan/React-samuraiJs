import React from "react";
import s from "./Users.module.css";
import ava from "../../assets/images/ava.jpg";
import {NavLink} from "react-router-dom";


let User = ({user, followingInProgress, unfollow, follow}) => {
    return (
        <div>
            <span>
              <div>
                <NavLink to={'/profile/' + user.id}>
                   <img src={user.photos.small !== null ? user.photos.small : ava} alt="avatarka"
                                         className={s.photo}/>
                </NavLink>
              </div>
              <div>
                  {user.followed ?
                      <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                          unfollow(user.id)
                      }}> Unfollow </button>
                      : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                          follow(user.id)
                      }}> Follow </button>}
              </div>
            </span>
            <span>
                <span>
                   <div>{user.name} ~~~{user.status}~~~</div>
                </span>
                <span>
                   {/*<div>{user.location.country} {user.location.city}</div>*/}
                </span>
            </span>
        </div>
    )
}

export default User