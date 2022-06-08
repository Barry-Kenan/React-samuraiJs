import React from "react";
import {actions} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";


let mapStateToProps = (state) => {
    return {
        newPostText : state.profilePage.newPostText,
        posts : state.profilePage.posts
    }
}
const addPost= actions.addPost
const MyPostsContainer = connect(mapStateToProps, {addPost})(MyPosts)

export default MyPostsContainer;