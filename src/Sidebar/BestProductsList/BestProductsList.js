import React from "react";
import './BestProductsList.css';
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

class BestProductsList extends React.Component {
    best_products = [];

    constructor(props) {
        super(props);

        this.state = {
            loaded_best_products: false,
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

    async componentDidMount() {
        axios.get('/api/get/products').then(res => {
            let products = res.data.products;
            products.sort(this.compareProducts);
            for (let i = 0; i < Math.min(products.length, 3); ++i) {
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

    render() {
        return (
            <div className="best-products-panel">
                <h2>Лучшие товары:</h2>
                <ul className="best-products-list">
                    {this.getBestProductsList()}
                </ul>
            </div>
        )
    }
}

export default BestProductsList;
