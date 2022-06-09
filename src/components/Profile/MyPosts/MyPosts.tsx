import React from "react";
import s from './MyPosts.module.css'
import Post from "./Posts/Post";
import {PostType} from "../../../types/types";
import AddNewPostForm from "./AddPostForm/AddPostForm";

export type MapPropsType = {
    posts: Array<PostType>
}
export type MapDispatchPropsType = {
    addPost : (messageText:string) => void
}
export type NewPostFormType = {
    newPostText: string
}

const MyPosts: React.FC<MapPropsType & MapDispatchPropsType> = React.memo(props => {
    let postsElements = props.posts.map(e => <Post text={e.message} key={e.id} likesCount={e.likesCount}/>)


    const addNewPost = (values:NewPostFormType) => {
        props.addPost(values.newPostText)
    }

    return (
        <div className={s.postBlock}>
            My Posts
            <AddNewPostForm onSubmit={addNewPost} />
            <div className={s.posts}>
                {postsElements}
            </div>

        </div>
    )
});




export default MyPosts;