import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/noimg.jpg";
import {NavLink} from "react-router-dom";


let User = ({user, followingInProgress, follow, unfollow}) => {
    return (


           <div key={user.id}>
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
                                    disabled={followingInProgress.some(id => id === user.id)}
                                    onClick={() => {
                                        unfollow(user.id)
                                    }}>unfollow</button> : <button
                                    disabled={followingInProgress.some(id => id === user.id)}
                                    onClick={() => {
                                        follow(user.id)
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
                </div>
    )
}

export default User