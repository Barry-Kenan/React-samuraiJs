import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UsersType} from "../../types/types";
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType} from "../../redux/users-reducer";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    users: Array<UsersType>
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    onFilterChanged: (filter: FilterType) => void
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}


let Users: React.FC<PropsType> = ({currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props}) => {

    return (
        <div>
            <UsersSearchForm onFilterChanged={props.onFilterChanged}/>
            <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount}
                       pageSize={pageSize}/>
            <div>
                {users.map(user => <User key={user.id} user={user} followingInProgress={props.followingInProgress}
                                         unfollow={props.unfollow} follow={props.follow}/>)}
            </div>
        </div>
    )
}

export default Users