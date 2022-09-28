import React from "react";
import './LoginPanel.css';
import 'react-toastify/dist/ReactToastify.css';

class LoginPanel extends React.Component {
    render() {
        return (
            <>
                <h2>Войти:</h2>
                <form onSubmit={this.props.login} className="user-form">
                    <label>Логин:</label>
                    <input type="text" name="login" />
                    <label>Пароль:</label>
                    <input type="password" name="password" />
                    <input type="submit" value="Войти" className="button"/>
                </form>
                <button onClick={() => {this.props.changeNeedRenderLogin(false)}}>Зарегистрироваться</button>
            </>
        )
    }
}

export default LoginPanel;
