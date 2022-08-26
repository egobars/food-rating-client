import React from "react";
import './Product.css';

class Product extends React.Component {
    render() {
        return (
            <div className="product" onClick={() => {this.props.setRedirectId(this.props.product.id)}}>
                <h2>{this.props.product.name}</h2>
                <img src={this.props.product.image} width="170" height="170" alt='product' />
                <span className="catalog-product-short-description">{this.props.product.short_description}</span>
                <div className="catalog-product-rating-wrapper">
                    <div className="catalog-product-rating-mark-wrapper">
                        <span className="catalog-product-rating-label">Оценка:</span>
                        <span className="catalog-product-rating-mark">{(this.props.product.average_mark).toFixed(2)}</span>
                    </div>
                    <span className="catalog-product-rating-count">Количество оценок: {this.props.product.comments_count}</span>
                </div>
            </div>
        )
    }
}

export default Product;
