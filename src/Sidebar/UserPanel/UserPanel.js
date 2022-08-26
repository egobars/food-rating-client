import React from "react";
import './UserPanel.css';
import 'react-toastify/dist/ReactToastify.css';
import LoginPanel from "./LoginPanel/LoginPanel";
import RegisterPanel from "./RegisterPanel/RegisterPanel";
import UserInfoPanel from "./UserInfoPanel/UserInfoPanel";

class UserPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            need_render_login: true,
        }

        this.changeNeedRenderLogin = this.changeNeedRenderLogin.bind(this);
    }

    changeNeedRenderLogin(value) {
        this.setState({need_render_login: value});
    }

    renderUserPanel() {
        if (this.props.user == null) {
            if (this.state.need_render_login) {
                return (
                    <LoginPanel changeNeedRenderLogin={this.changeNeedRenderLogin} login={this.props.login} />
                );
            } else {
                return (
                    <RegisterPanel changeNeedRenderLogin={this.changeNeedRenderLogin} register={this.props.register} />
                );
            }
        } else {
            return (
                <UserInfoPanel user={this.props.user} logout={this.props.logout} />
            )
        }
    }

    render() {
        return (
            <div className="sidebar-user-panel">
                {this.renderUserPanel()}
            </div>
        )
    }
}

export default UserPanel;
