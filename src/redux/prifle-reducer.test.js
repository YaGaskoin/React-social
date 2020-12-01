import profileReducer, {
    addPostActionCreator,
    deletePost
} from "./profile-reducer";


it('new post should be added', () => {
    // 1.test-data
    let action = addPostActionCreator("it-kamasutra")
    let state = {
    posts: [
                {id: '1', message: 'Hi, how are you?', likesCount: '10'},
                {id: '2', message: 'Are Ya winning son?', likesCount: '12'},
            ],
            newPost: '',
}
    //2.action
    let newState = profileReducer(state, action)
    //check differences between res and expectations
    expect(newState.posts.length).toBe(3);
    expect(newState.posts[2].message).toBe('it-kamasutra');
})

it('after deleting length of messages should be decremented', () => {
    let action = deletePost(1);
    let state = {
    posts: [
                {id: '1', message: 'Hi, how are you?', likesCount: '10'},
                {id: '2', message: 'Are Ya winning son?', likesCount: '12'},
            ],
            newPost: '',
    }
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(1)
})

