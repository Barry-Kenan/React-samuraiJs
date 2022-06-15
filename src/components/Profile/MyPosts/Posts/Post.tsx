import React, {createElement, useState} from "react";
import s from './Post.module.css'
import {Avatar, Comment, Tooltip} from "antd";
import {LikeFilled, LikeOutlined} from '@ant-design/icons';

type PropsType = {
    text: string
    likesCount:number
}
const Post:React.FC<PropsType> = (props) => {

    const [likes, setLikes] = useState(props.likesCount);
    const [action, setAction] = useState<string | null>(null);

    const like = () => {
        setLikes(props.likesCount+1);
        setAction('liked');
    };



    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
          <span className="comment-action">{likes}</span>
      </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
        </Tooltip>,
        <span key="comment-basic-reply-to">Reply to</span>,
    ];


    return (
            <div className={s.item}>
                <Comment
                    actions={actions}
                    author={<a>Han Solo</a>}
                    content={props.text}
                    avatar={<Avatar src="https://shapka-youtube.ru/wp-content/uploads/2021/02/prikolnaya-avatarka-dlya-patsanov.jpg" />}
                        />
                {/*<img src="https://shapka-youtube.ru/wp-content/uploads/2021/02/prikolnaya-avatarka-dlya-patsanov.jpg"
                     alt="avatarka"/>
                {props.text}
                <div>Likes count {props.likesCount}</div>*/}
            </div>
    )
}

export default Post;