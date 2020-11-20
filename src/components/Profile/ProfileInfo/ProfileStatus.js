import React from "react";
import css from "./ProfileInfo.module.css";


class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode = () => {
       this.setState({
           editMode: true
       })
    }

    deactivateEditMode = () => {
       this.setState({
           editMode: false
       })
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e) => {
        this.setState({...this.state, status: e.currentTarget.value});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div>

                {this.state.editMode ? <div>
                    <input autoFocus={true} onChange={this.onStatusChange} onBlur={this.deactivateEditMode} value={this.state.status}/>
                </div> : <div>
                    <span onDoubleClick={this.activateEditMode} > {this.props.status || '------'} </span>
                </div>}

                <div className={css.profile_info__text}>
                    {this.props.profile.aboutMe}
                </div>
                <div>
                    {this.props.profile.lookingForAJob ? <div>В поиске работы:
                        Да<br/>Описание: {this.props.profile.lookingForAJobDescription}
                    </div> : <div>В поиске работы: Нет</div>}
                </div>
            </div>
        )
    }
}

export default ProfileStatus