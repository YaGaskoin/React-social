import MyPosts from "./MyPosts";
import {
    addPostActionCreator,
    changePostActionCreator
} from "../../../redux/profile-reducer";
import {connect} from 'react-redux'


const mapSateToProps = (state) => {
    console.log(state)
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPost
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNewPostText: (text) => {dispatch(changePostActionCreator(text))},
        addPost: (e) => {e.preventDefault();dispatch(addPostActionCreator())},

    }
}

const MyPostsContainer = connect(mapSateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;