
const CHANGE_NEW_MESSAGE_BODY = 'change_new_message_body';
const SEND_MESSAGE = 'send_message';

let initialState = {
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
}

const dialogsReducer = (state=initialState, action) => {
    switch(action.type){
        case CHANGE_NEW_MESSAGE_BODY:
            state.newMessage = action.text;
            return state
        case SEND_MESSAGE:
            state.usersMessages.push({
            id: 7,
            date: '01.01.2013',
            text: state.newMessage
            })
            state.newMessage = '';
            return state
        default:
            return state
    }
}

  export let changeMessageActionCreator = ( text) => {
        return {
         type: CHANGE_NEW_MESSAGE_BODY,
         text: text,
     }
    }
    export let addMessageActionCreator = () => {
        return {
         type: SEND_MESSAGE,
     }
    }

export default dialogsReducer;