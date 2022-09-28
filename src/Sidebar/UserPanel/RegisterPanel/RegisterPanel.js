import React from "react";
import './RegisterPanel.css';
import 'react-toastify/dist/ReactToastify.css';

class RegisterPanel extends React.Component {
    render() {
        return (
            <>
                <h2>Зарегистрироваться:</h2>
                <form onSubmit={this.props.register} className="user-form">
                    <label>Логин:</label>
                    <input type="text" name="login" />
                    <label>Пароль:</label>
                    <input type="password" name="password" />
                    <label>Повтор пароля:</label>
                    <input type="password" name="repeat_password" />
                    <input type="submit" value="Зарегистрироваться" className="button"/>
                </form>
                <button onClick={() => {this.props.changeNeedRenderLogin(true)}}>Войти</button>
            </>
        )
    }
}

export default RegisterPanel;
