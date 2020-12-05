import React from 'react'
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";


class UsersApiComponent extends React.Component{

    componentDidMount() {
        this.props.getUsersThunk(this.props.currentPage, this.props.pageSize);
    }

    changePage = (page) => {
       this.props.getUsersThunk(page, this.props.pageSize);
       this.props.setCurPage(page);
    }


    render() {
       return <>
           {this.props.isFetching ? <Preloader /> : null}<Users {...this.props} changePage={this.changePage}/>
       </>
    }
}

export default UsersApiComponent;