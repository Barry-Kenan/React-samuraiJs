import React from "react";
import {connect} from "react-redux";
import {follow, requestUsers, unfollow} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {WithAuthRedirect} from "../../hoc/withAuthRedirect";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";
import {UsersType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";


type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching:boolean
    totalUsersCount:number
    users:Array<UsersType>
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    follow: (userId:number) => void
    unfollow: (userId:number) => void
    getUsers: (currentPage:number,pageSize:number) => void

}

type OwnPropsType = {
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType


class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.getUsers(currentPage, pageSize)
    }

    onPageChanged = (pageNumber:number) => {
        const {pageSize} = this.props
        this.props.getUsers(pageNumber, pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   users={this.props.users}
                   onPageChanged = {this.onPageChanged}
                   unfollow={this.props.unfollow}
                   follow={this.props.follow}
                   followingInProgress = {this.props.followingInProgress}/>

        </>
    }
}

let mapStateToProps = (state:AppStateType): MapStatePropsType => {
    return {
        users : getUsers(state),
        pageSize : getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}




export default compose(
    connect<MapStatePropsType,MapDispatchPropsType,OwnPropsType,AppStateType>
    (mapStateToProps,
        {follow, unfollow, getUsers: requestUsers}),
    WithAuthRedirect
)(UsersContainer)