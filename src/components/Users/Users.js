import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";


let Users = (props) => {
    return (

        <div>
            <Paginator onPageChanged={props.changePage} currentPage={props.currentPage}
            totalItemsCount={props.totalUsersCount} pageSize={props.pageSize} perPortion={10}/>
            {
                props.users.map((user) =>
                    <User user={user} key={user.id}
                    followingInProgress={props.followingInProgress}
                    follow={props.follow} unfollow={props.unfollow}/>)
            }
        </div>
    )
}

export default Users