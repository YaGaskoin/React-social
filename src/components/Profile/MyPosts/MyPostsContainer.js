import MyPosts from "./MyPosts";
import {
    addPostActionCreator,
    changePostActionCreator
} from "../../../redux/profile-reducer";
import {connect} from 'react-redux'


const mapSateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPost
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNewPostText: (text) => {dispatch(changePostActionCreator(text))},
        addPost: (text) => {dispatch(addPostActionCreator(text))},

    }
}

const MyPostsContainer = connect(mapSateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;