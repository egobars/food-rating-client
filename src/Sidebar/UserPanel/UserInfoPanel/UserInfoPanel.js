import React from "react";
import './UserInfoPanel.css';
import 'react-toastify/dist/ReactToastify.css';

class UserInfoPanel extends React.Component {
    render() {
        return (
            <>
                <h2>Текущий пользователь:</h2>
                <div className="user-wrapper">
                    <span>{this.props.user.login}</span>
                    <span className="user-comments-karma">Комменатрии: {this.props.user.commentsCount}</span>
                    <span className="user-comments-karma">Карма: {this.props.user.karma}</span>
                    <button onClick={this.props.logout}>Выйти</button>
                </div>
            </>
        )
    }
}

export default UserInfoPanel;
