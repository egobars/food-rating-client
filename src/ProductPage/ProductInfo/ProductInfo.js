import React from "react";
import './ProductInfo.css';
import axios from "axios";
import {isMobile} from "react-device-detect";

class ProductInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded_product: false,
            name: '',
            image: '',
            long_description: '',
            mark: 0,
        }
    }

    componentDidMount() {
        axios.get('/api/get/product/' + this.props.id).then(res => {
            let product = res.data.product;
            this.setState({
                loaded_product: true,
                name: product.name,
                image: product.image,
                long_description: product.longDescription,
                mark: product.averageMark,
            });
        });
    }

    render() {
        let imageSize = 400;
        if (isMobile) {
            imageSize = 380;
        }

        if (!this.state.loaded_product) {
            return (
                <span>...</span>
            )
        }
        return (
            <div className="product-overall">
                <img src={this.state.image} width={imageSize} height={imageSize} alt='product'></img>
                <div className="product-name-description-rating">
                    <h1>{this.state.name}</h1>
                    <span className="product-long-description">{this.state.long_description}</span>
                    <div className="product-overall-rating-wrapper">
                        <span className="product-overall-rating-label">Оценка:</span>
                        <span className="product-overall-rating-mark">{(this.state.mark).toFixed(2)}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductInfo;
