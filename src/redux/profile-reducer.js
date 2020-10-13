const ADD_POST = 'add_post';
const CHANGE_NEW_POST_TEXT = 'change_new_post_text';

let initalState = {
    posts: [
                {id: '1', message: 'Hi, how are you?', likesCount: '10'},
                {id: '2', message: 'Are Ya winning son?', likesCount: '12'},
            ],
            newPost: '',
}

const profileReducer = (state = initalState, action) => {
    switch(action.type){
        case ADD_POST:
            let newPost = {
                id: '3',
                message: state.newPost,
                likesCount: '0',
            }
            state.posts.push(newPost);
            state.newPost = '';
            return state;
        case CHANGE_NEW_POST_TEXT:
            state.newPost = action.text;
            return state
        default:
          return state
    }

}

export let addPostActionCreator = () => {
    return {
            type: ADD_POST
        }
    }
    export let changePostActionCreator = ( text) => {
        return {
         type: CHANGE_NEW_POST_TEXT,
         text: text,
     }
    }

export default profileReducer;