import React from "react";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from "./Header/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Catalog from "./Catalog/Catalog";
import Add from "./Add/Add";
import ProductPage from "./ProductPage/ProductPage";

class Account extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        }
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    async componentDidMount() {
        let thisObject = this;

        let data = await axios.get('/api/account/get').catch(function (error) {
            if (error.response) {
                thisObject.setState({user: null});
            }
        });

        if (data !== undefined) {
            this.setState({user: data.data});
        }
    }

    async register(event) {
        event.preventDefault();

        if (event.target[1].value !== event.target[2].value) {
            toast.error('Passwords don\'t match!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        let body = {
            Login: event.target[0].value,
            Password: event.target[1].value
        }

        let data = await axios.post('/api/account/register', body).catch(function (error) {
            if (error.response) {
                let message = error.response.data;

                if (message === "This login already exists") {
                    toast.error('This login already exists!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    toast.error('Unknown error!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            }
        });

        if (data === undefined) {
            return;
        }

        this.setState({user: data.data});
    }

    async login(event) {
        event.preventDefault();

        let body = {
            Login: event.target[0].value,
            Password: event.target[1].value
        }

        let data = await axios.post('/api/account/login', body).catch(function (error) {
            if (error.response) {
                let message = error.response.data;

                if (message === "User not found") {
                    toast.error('User not found!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else if (message === "Wrong password") {
                    toast.error('Wrong password!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    toast.error('Unknown error!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            }
        });

        if (data === undefined) {
            return;
        }

        this.setState({user: data.data});
    }

    async logout(event) {
        event.preventDefault();
        await axios.post('/api/account/logout');
        this.setState({
            user: null
        });
    }

    render() {
        return (
            <div className='main-wrapper'>
                <Header />
                <div className="main-page-wrapper">
                    <BrowserRouter>
                        <Sidebar user={this.state.user} register={this.register} login={this.login} logout={this.logout} />
                        <div className="content-wrapper">
                            <Routes>
                                <Route path='/' element={<Catalog user={this.state.user} />} />
                                <Route path='/add' element={<Add user={this.state.user} />} />
                                <Route path='/products/*' element={<ProductPage user={this.state.user} />} />
                            </Routes>
                        </div>
                    </BrowserRouter>
                </div>
                <ToastContainer />
            </div>
        );
    }
}

export default Account;
