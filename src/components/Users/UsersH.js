import React, {useEffect} from "react";
import Users from "./Users";
import {connect} from "react-redux";
import {follow, requestUsers, setCurrentPage, unfollow} from "../../redux/users-reducer";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

const UsersHooks = (props) => {

    useEffect(()=>{
        props.getUsers(props.currentPage, props.pageSize)
    })

    let onPageChanged = (pageNumber) => {
        props.getUsers(pageNumber, props.pageSize)
    }

    return (
            <Users totalUsersCount={props.totalUsersCount}
                   pageSize={props.pageSize}
                   currentPage={props.currentPage}
                   users={props.users}
                   onPageChanged = {onPageChanged}
                   unfollow={props.unfollow}
                   follow={props.follow}
                   followingInProgress = {props.followingInProgress}/>


    )
}


let mapStateToProps = (state) => {
    return {
        users : state.usersPage.users,
        pageSize : state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}


export default compose(
    connect(mapStateToProps,{follow, unfollow, setCurrentPage, getUsers: requestUsers}),
    WithAuthRedirect
)(UsersHooks)


