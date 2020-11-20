import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/noimg.jpg";
import {NavLink} from "react-router-dom";

let Users = (props) => {
    let totalPagesCount = props.totalUsersCount / props.pageSize;
    let pages = []
    for (let i = 1; i <= Math.ceil(totalPagesCount); i++) {
        pages.push(i);
    }
    return (

        <div>
            <div>
                {pages.map((page) => {
                    return <span onClick={(e) => {
                        props.changePage(page)
                    }}
                                 className={page === props.currentPage ? styles.selectedPage : ''}>{page}</span>
                })}
            </div>
            {
                props.users.map((user) => <div key={user.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + user.id}>
                            <img
                                src={user.photos.small ? user.photos.small : userPhoto}
                                className={styles.usersPhoto}/>
                                </NavLink>
                        </div>
                        <div>
                                {user.followed ? <button
                                    disabled={props.followingInProgress.some(id => id === user.id)}
                                    onClick={() => {
                                        props.unfollow(user.id)
                                    }}>unfollow</button> : <button
                                    disabled={props.followingInProgress.some(id => id === user.id)}
                                    onClick={() => {
                                        props.follow(user.id)
                                    }}>follow</button>}
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>
                                {user.name}
                            </div>
                            <div>
                                {user.status}
                            </div>
                        </span>
                        <span>
                            <div>
                                {'user.location.city'}
                            </div>
                            <div>
                                {'user.location.country'}
                            </div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    )
}

export default Users