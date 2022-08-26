import React from "react";
import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="header-main">
                    <a href='/'>Food Rating</a>
                </div>
                <div className="header-right-side">
                    <button onClick={this.props.collapseSidebar}>≡</button>
                </div>
            </div>
        )
    }
}

export default Header;
