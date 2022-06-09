import React from "react";
import {actions} from "../../../redux/profile-reducer";
import MyPosts, {MapDispatchPropsType, MapPropsType} from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";



let mapStateToProps = (state:AppStateType) => {
    return {
        posts : state.profilePage.posts
    }
}
const MyPostsContainer = connect<MapPropsType,MapDispatchPropsType,{},AppStateType>(mapStateToProps,
    {addPost:actions.addPost})(MyPosts)

export default MyPostsContainer;