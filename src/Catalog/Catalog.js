import React from "react";
import './Catalog.css';
import ProductList from "./ProductList/ProductList";

class Catalog extends React.Component {
    render() {
        return (
            <div className="content-catalog">
                <h1>Каталог</h1>
                <ProductList />
            </div>
        );
    }
}

export default Catalog;
