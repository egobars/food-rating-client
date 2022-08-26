import React from "react";
import './BestUsersList.css';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

class BestUsersList extends React.Component {
    best_users = [];

    constructor(props) {
        super(props);

        this.state = {
            loaded_best_users: false,
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
        axios.get('/api/get/users').then(res => {
            let users = res.data.users;
            users.sort(this.compareUsers);
            for (let i = 0; i < Math.min(users.length, 3); ++i) {
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

    getBestUsersList() {
        let to_return = [];
        if (this.state.loaded_best_users) {
            for (let i = 0; i < this.best_users.length; ++i) {
                to_return.push(<li key={i}>
                    <div className="best-user-wrapper">
                        <span className="best-users-login">{this.best_users[i].login}</span>
                        <div className="best-user-comment-karma-wrapper">
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

    render() {
        return (
            <div className="best-users-panel">
                <h2>Лучшие пользователи:</h2>
                <ul className="best-users-list">
                    {this.getBestUsersList()}
                </ul>
            </div>
        )
    }
}

export default BestUsersList;
