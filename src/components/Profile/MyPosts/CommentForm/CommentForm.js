import React from "react";
import {Field, reduxForm} from 'redux-form'
import {
    maxLength,
    requiredField
} from "../../../../utils/validators/validators";
import {Textarea} from "../../../common/FormsControls/FormsControls";

const maxLength100 = maxLength(100);
const CommentForm = (props) => {

    // let newPostElement = React.createRef();
    //
    // let onPostChange = (e) => {
    //     e.preventDefault();
    //     let text = newPostElement.current.value;
    //     props.updateNewPostText(text);
    // }



    return (

                <form onSubmit={props.handleSubmit}>
                    <div>
                    <Field component={Textarea} name={'postText'} palaceholder={'Оставьте свое сообщение'} validate={[requiredField, maxLength100]}/>
                        </div>
                    <div>
                    <button>Отправить </button>
                    </div>
                </form>
    )
}

const ReduxCommentForm = reduxForm({
    form: 'comment'
})(CommentForm)

export default ReduxCommentForm