import React from "react";
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Catalog from "./Catalog/Catalog";
import Add from "./Add/Add";
import ProductPage from "./ProductPage/ProductPage";
import {ToastContainer} from "react-toastify";
import { isMobile } from 'react-device-detect';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            is_sidebar_collapsed: isMobile
        }

        this.collapseSidebar = this.collapseSidebar.bind(this);
    }

    collapseSidebar() {
        this.setState({
            is_sidebar_collapsed: !this.state.is_sidebar_collapsed
        });
    }

    getContent() {
        if (isMobile && !this.state.is_sidebar_collapsed) {
            return (
                <></>
            )
        }
        return (
            <div className="content-wrapper">
                <Routes>
                    <Route path='/' element={<Catalog user={this.props.user} />} />
                    <Route path='/add' element={<Add user={this.props.user} />} />
                    <Route path='/products/*' element={<ProductPage user={this.props.user} />} />
                </Routes>
            </div>
        )
    }

    render() {
        return (
            <BrowserRouter>
                <div className='main-wrapper'>
                    <Header collapseSidebar={this.collapseSidebar} />
                    <div className="main-page-wrapper">
                        <Sidebar is_collapsed={this.state.is_sidebar_collapsed} user={this.props.user} register={this.props.register} login={this.props.login} logout={this.props.logout} />
                        {this.getContent()}
                    </div>
                    <ToastContainer />
                </div>
            </BrowserRouter>
        )
    }
}

export default App;
