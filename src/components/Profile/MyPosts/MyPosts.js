import React from "react";
import s from './MyPosts.module.css'
import Post from "./Posts/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators";
import {Textarea} from "../../common/FormControls/FormControls";

const maxLength30 = maxLengthCreator(30)

const MyPosts = React.memo(props => {
    console.log('render')
    let postsElements = props.posts.map(e => <Post text={e.message} key={e.id} likesCount={e.likesCount}/>)


    const addNewPost = (value) => {
        props.addPost(value.newPostText)
    }

    return (
        <div className={s.postBlock}>
            My Posts
            <AddNewPostFormRedux onSubmit={addNewPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>

        </div>
    )
});

const AddNewPostForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name="newPostText" placeholder="new Post"
                validate={[required,maxLength30]}/>
            </div>
            <button>Add post</button>
        </form>
    )
}

const AddNewPostFormRedux = reduxForm({form : 'ProfileAddPost'})(AddNewPostForm)


export default MyPosts;