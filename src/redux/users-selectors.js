import {createSelector} from "reselect";


export const getUsers = (state) => {
    return state.usersPage.users;
}

export const getUsersSuperSelector = createSelector(getUsers, (users) => {
    return users.filter( u => true)
})