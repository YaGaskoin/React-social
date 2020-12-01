import React from "react";
import css from './MyPosts.module.css'
import Post from "./Post/Post";
import CommentForm from "./CommentForm/CommentForm";

const MyPosts = React.memo((props) => {
        let postsComponents = props.posts.map((el) => {
                return (
                    <Post text={el.message}/>
                )
        })

        const postSubmit = (formData) => {
        props.addPost(formData.postText)
    }

        return (
                <div className={css.posts}>
                 <h3>My posts</h3>
                        {postsComponents}
                <CommentForm onSubmit={postSubmit}/>
                </div>
        )
})

export default MyPosts;