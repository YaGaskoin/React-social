import React from "react";
import css from './MyPosts.module.css'
import Post from "./Post/Post";
import CommentForm from "./CommentForm/CommentForm";

const MyPosts = (props) => {

        let postsComponents = props.posts.map((el) => {
                return (
                    <Post text={el.message}/>
                )
        })

        return (
                <div className={css.posts}>
                 <h3>My posts</h3>
                        {postsComponents}
                <CommentForm newPost={props.newPost} updateNewPostText={props.updateNewPostText}
                             addPost={props.addPost}/>
                </div>
        )
}

export default MyPosts;