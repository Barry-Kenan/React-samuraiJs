import React from "react";
import s from "./Users.module.css";
import ava from "../../assets/images/ava.jpg";
import {NavLink} from "react-router-dom";
import {UsersType} from "../../types/types";
import {Button, Card, Divider} from "antd";

type PropsType = {
    user: UsersType
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let User: React.FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {
    return (
        <div>
            <Card title={user.name} bordered hoverable size={"small"} style={{width: 200, textAlign:"center", marginTop:10}}>
                <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small !== null ? user.photos.small : ava} alt="avatarka"
                         className={s.photo}/>
                </NavLink>
                <Divider />
                <p>
                    {user.followed ?
                        <Button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            unfollow(user.id)
                        }}> Unfollow </Button>
                        : <Button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                            follow(user.id)
                        }}> Follow </Button>}
                </p>
            </Card>
        </div>
    )
}

export default User