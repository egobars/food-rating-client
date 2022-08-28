import React from "react";
import './ProductList.css';
import axios from "axios";
import {Navigate} from "react-router-dom";
import Product from "./Product/Product";

class ProductList extends React.Component {
    products = [];

    constructor(props) {
        super(props);

        this.state = {
            loaded_products: false,
            redirect_id: ''
        }

        this.setRedirectId = this.setRedirectId.bind(this);
    }

    getProductsList(search_word) {
        let url = '/api/get/products';
        if (search_word !== '') {
            url += '/' + search_word;
        }
        axios.get(url).then(res => {
            this.products = [];
            let products = res.data.products;
            for (let i = 0; i < products.length; ++i) {
                this.products.push({
                    id: products[i].id,
                    name: products[i].name,
                    image: products[i].image,
                    short_description: products[i].shortDescription,
                    average_mark: products[i].averageMark,
                    comments_count: products[i].commentsCount
                });
            }
            this.setState({
                loaded_products: true
            });
        });
    }

    componentDidMount() {
        this.getProductsList('');
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.search_word !== prevProps.search_word) {
            this.setState({
                loaded_products: false
            });
            this.getProductsList(this.props.search_word);
        }
    }

    setRedirectId(redirect_id) {
        this.setState({redirect_id: redirect_id});
    }

    genProductsList() {
        if (this.state.loaded_products) {
            let to_return = [];
            for (let i = 0; i < this.products.length; ++i) {
                to_return.push(
                    <Product key={i} product={this.products[i]} setRedirectId={this.setRedirectId} />
                );
            }
            return to_return;
        } else {
            return (
                <span>...</span>
            );
        }
    }

    render() {
        if (this.state.redirect_id !== '') {
            return (
                <Navigate to={'/products/' + this.state.redirect_id} />
            );
        }
        return (
            <div className="products-grid">
                {this.genProductsList()}
            </div>
        );
    }
}

export default ProductList;
