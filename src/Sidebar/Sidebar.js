import React from "react";
import './Sidebar.css';
import 'react-toastify/dist/ReactToastify.css';
import BestProductsList from "./BestProductsList/BestProductsList";
import BestUsersList from "./BestUsersList/BestUsersList";
import UserPanel from "./UserPanel/UserPanel";

class Sidebar extends React.Component {
    render() {
        if (this.props.is_collapsed) {
            return (
                <></>
            )
        }
        return (
            <div className="sidebar">
                <div className="sidebar-content">
                    <div className="sidebar-panel">
                        <div className="add-product-panel">
                            <a href='/add'>
                                <button>Добавить продукт</button>
                            </a>
                        </div>
                        <BestProductsList />
                        <BestUsersList />
                        <UserPanel user={this.props.user} register={this.props.register} login={this.props.login} logout={this.props.logout} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar;
