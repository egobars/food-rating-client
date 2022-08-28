import React from "react";
import './SearchBar.css';

class SearchBar extends React.Component {
    render() {
        return (
            <input className='search-bar' type='text' placeholder='🔍 Поиск...' onChange={(event) => {this.props.changeSearchWord(event.target.value)}} />
        );
    }
}

export default SearchBar;
