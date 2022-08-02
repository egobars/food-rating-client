import React from "react";
import './Catalog.css';
import axios from "axios";
import {Navigate} from "react-router-dom";

class Catalog extends React.Component {
    products = [];

    constructor(props) {
        super(props);

        this.state = {
            loaded_products: false,
            redirectId: ''
        }
    }

    componentDidMount() {
        axios.get('/api/get/products').then(res => {
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

    getProductsList() {
        if (this.state.loaded_products) {
            let to_return = [];
            for (let i = 0; i < this.products.length; ++i) {
                let product = [];
                product.push(
                    <h2>{this.products[i].name}</h2>
                );
                product.push(
                    <img src={this.products[i].image} width="170" height="170" />
                );
                product.push(
                    <span className="catalog-product-short-description">{this.products[i].short_description}</span>
                );
                product.push(
                    <div className="catalog-product-rating-wrapper">
                        <div className="catalog-product-rating-mark-wrapper">
                            <span className="catalog-product-rating-label">Оценка:</span>
                            <span className="catalog-product-rating-mark">{this.products[i].average_mark}</span>
                        </div>
                        <span className="catalog-product-rating-count">Количество оценок: {this.products[i].comments_count}</span>
                    </div>
                );
                to_return.push(
                    <div className="product" onClick={(event) => {this.setState({redirectId: this.products[i].id});}}>
                        {product}
                    </div>
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
        if (this.state.redirectId !== '') {
            return (
                <Navigate to={'/products/' + this.state.redirectId} />
            );
        }
        return (
            <div className="content-catalog">
                <h1>Каталог</h1>
                <div className="products-grid">
                    {this.getProductsList()}
                </div>
            </div>
        );
    }
}

export default Catalog;
