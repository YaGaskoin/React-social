import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

const ADD_POST = 'add_post';
const CHANGE_NEW_POST_TEXT = 'change_new_post_text';
const CHANGE_NEW_MESSAGE_BODY = 'change_new_message_body';
const SEND_MESSAGE = 'send_message';

let store = {
    _state: {
        messagesPage: {
            usersMessages: [
                {id: 1, date: '13.03.2001', text: 'Пойдешь гулять?'},
                {id: 2, date: '13.03.2001', text: 'Пойдешь гулять?'},
                {id: 3, date: '13.03.2001', text: 'Пойдешь гулять?'},
                {id: 4, date: '13.03.2001', text: 'Пойдешь гулять?'},
                {id: 5, date: '13.03.2001', text: 'Пойдешь гулять?'},
                {id: 6, date: '13.03.2001', text: 'Пойдешь гулять?'},
            ],
            usersData: [
                {id: '1', name: 'Леха',},
                {id: '2', name: 'Егорыч',},
                {id: '3', name: 'Ваня',},
                {id: '4', name: 'Андрюха',},
                {id: '5', name: 'Димон',},
                {id: '6', name: 'Даня',},
            ],
            newMessage: '',
        },
        profilePage: {
            posts: [
                {id: '1', message: 'Hi, how are you?', likesCount: '10'},
                {id: '2', message: 'Are Ya winning son?', likesCount: '12'},
            ],
            newPost: '',
        },
        sidebar: {},
    },

    getState() {
        return this._state;
    },

    renderEntireTree(state) {

    },

    subscribe(observer) {
        this.renderEntireTree = observer;
    },

    dispatch(action) {
        profileReducer(this._state.profilePage, action);
        dialogsReducer(this._state.messagesPage, action);
        sidebarReducer(this._state.sidebar, action);
        this.renderEntireTree(this._state)
    }


}

window.state = store;

export default store;