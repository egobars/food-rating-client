import React from "react";
import './Sidebar.css';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

class Sidebar extends React.Component {
    best_products = [];
    best_users = [];

    constructor(props) {
        super(props);

        this.state = {
            loaded_best_products: false,
            loaded_best_users: false,
            login: "",
            password: "",
            second_password: "",
            need_render_login: true,
        }
    }

    compareProducts(a, b) {
        if (a.averageMark < b.averageMark) {
            return 1;
        } else if (a.averageMark === b.averageMark) {
            return 0;
        } else {
            return -1;
        }
    }

    compareUsers(a, b) {
        if (a.karma < b.karma) {
            return 1;
        } else if (a.karma === b.karma) {
            return 0;
        } else {
            return -1;
        }
    }

    async componentDidMount() {
        axios.get('/api/get/products').then(res => {
            let products = res.data.products;
            products.sort(this.compareProducts);
            for (let i = 0; i < Math.min(products.length, 5); ++i) {
                this.best_products.push({
                    name: products[i].name,
                    average_mark: products[i].averageMark,
                    comments_count: products[i].commentsCount
                });
            }
            this.setState({
                loaded_best_products: true
            });
        });

        axios.get('/api/get/users').then(res => {
            let users = res.data.users;
            users.sort(this.compareUsers);
            for (let i = 0; i < Math.min(users.length, 5); ++i) {
                this.best_users.push({
                    login: users[i].login,
                    comments_count: users[i].commentsCount,
                    karma: users[i].karma
                });
            }
            this.setState({
                loaded_best_users: true
            });
        });
    }

    getBestProductsList() {
        let to_return = [];
        if (this.state.loaded_best_products) {
            for (let i = 0; i < this.best_products.length; ++i) {
                to_return.push(<li key={i}>
                    <div>
                        <span className="best-products-name">{this.best_products[i].name}</span>
                        <span className="best-products-comments-count">Количество оценок: {this.best_products[i].comments_count}</span>
                    </div>
                    <span className="best-products-average-mark">{(this.best_products[i].average_mark).toFixed(2)} &#9733;</span>
                </li>)
            }
        } else {
            to_return.push(<li key='0'>
                <span>...</span>
            </li>)
        }
        return to_return;
    }

    getBestUsersList() {
        let to_return = [];
        if (this.state.loaded_best_users) {
            for (let i = 0; i < this.best_users.length; ++i) {
                to_return.push(<li key={i}>
                    <div className="flex-column-margin-top-10">
                        <span className="best-users-login">{this.best_users[i].login}</span>
                        <div className="flex-row-gray-gap-10">
                            <span className="best-products-karma">Карма: {this.best_users[i].karma}</span>
                            <span className="best-users-comments-count">Комментарии: {this.best_users[i].comments_count}</span>
                        </div>
                    </div>
                </li>)
            }
        } else {
            to_return.push(<li key='0'>
                <span>...</span>
            </li>)
        }
        return to_return;
    }

    renderUserPanel() {
        if (this.props.user == null) {
            if (this.state.need_render_login) {
                return (
                    <>
                        <h2>Войти:</h2>
                        <form onSubmit={this.props.login}>
                            <label>Логин:</label>
                            <input type="text" name="login" value={this.state.login}
                                   onChange={(event) => this.setState({login: event.target.value})}/>
                            <label>Пароль:</label>
                            <input type="password" name="password" value={this.state.password}
                                   onChange={(event) => this.setState({password: event.target.value})}/>
                            <input type="submit" value="Войти" className="button"/>
                        </form>
                        <button onClick={() => {this.setState({need_render_login: false})}}>Зарегистрироваться</button>
                    </>
                );
            } else {
                return (
                    <>
                        <h2>Зарегистрироваться:</h2>
                        <form onSubmit={this.props.register}>
                            <label>Логин:</label>
                            <input type="text" name="login" value={this.state.login}
                                   onChange={(event) => this.setState({login: event.target.value})}/>
                            <label>Пароль:</label>
                            <input type="password" name="password" value={this.state.password}
                                   onChange={(event) => this.setState({password: event.target.value})}/>
                            <label>Повтор пароля:</label>
                            <input type="password" name="repeat_password" value={this.state.second_password}
                                   onChange={(event) => this.setState({second_password: event.target.value})}/>
                            <input type="submit" value="Зарегистрироваться" className="button"/>
                        </form>
                        <button onClick={() => {this.setState({need_render_login: true})}}>Войти</button>
                    </>
                );
            }
        } else {
            return (
                <>
                    <h2>Текущий пользователь:</h2>
                    <div className="user-wrapper">
                        <span>{this.props.user.login}</span>
                        <span className="color-gray">Комменатрии: {this.props.user.commentsCount}</span>
                        <span className="color-gray">Карма: {this.props.user.karma}</span>
                        <button onClick={this.props.logout}>Выйти</button>
                    </div>
                </>
            )
        }
    }

    render() {
        return (
            <div className="sidebar">
                <div className="sidebar-content">
                    <div className="vertical-line" />
                    <div className="sidebar-panel">
                        <div className="best-products-panel">
                            <h2>Лучшие товары:</h2>
                            <ul className="best-products-list">
                                {this.getBestProductsList()}
                            </ul>
                        </div>
                        <div className="best-users-panel">
                            <h2>Лучшие пользователи:</h2>
                            <ul className="best-users-list">
                                {this.getBestUsersList()}
                            </ul>
                        </div>
                        <div className="sidebar-user-panel">
                            {this.renderUserPanel()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar;
