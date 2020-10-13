import css from "./CommentForm.module.css";
import React from "react";
import {
    addPostActionCreator,
    changePostActionCreator
} from "../../../../redux/profile-reducer";


const CommentForm = (props) => {

    let newPostElement = React.createRef();

    let onPostChange = (e) => {
        e.preventDefault();
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    }


    return (

                <form className={css.comment_form}>
                    <div>
                    <textarea ref={newPostElement} onChange={onPostChange}  value={props.newPost}/>
                        </div>
                    <div>
                    <button onClick={props.addPost}>Отправить </button>
                    </div>
                </form>
    )
}

export default CommentForm