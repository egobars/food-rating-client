import React from "react";
import './Catalog.css';
import ProductList from "./ProductList/ProductList";
import SearchBar from "./SearchBar/SearchBar";

class Catalog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            search_word: ''
        }

        this.changeSearchWord = this.changeSearchWord.bind(this);
    }

    changeSearchWord(search_word) {
        this.setState({search_word: search_word});
    }

    render() {
        return (
            <div className="content-catalog">
                <h1>Каталог</h1>
                <SearchBar changeSearchWord={this.changeSearchWord} />
                <ProductList search_word={this.state.search_word} />
            </div>
        );
    }
}

export default Catalog;
