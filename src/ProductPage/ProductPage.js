import React from "react";
import './ProductPage.css';
import AddComment from "./AddComment/AddComment";
import ProductInfo from "./ProductInfo/ProductInfo";
import CommentsList from "./CommentsList/CommentsList";

class ProductPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: -1,
            post_comment: undefined
        };
    }

    componentDidMount() {
        let path = window.location.pathname;
        for (let i = path.length - 1; i > -1; --i) {
            if (path[i] === '/') {
                this.setState({id: path.slice(i + 1, path.length)});
                break;
            }
        }
    }

    render() {
        if (this.state.id === -1) {
            return (
                <span>...</span>
            )
        }
        return (
            <div className="product-content">
                <ProductInfo id={this.state.id} />
                <h1>Комментарии:</h1>
                <CommentsList ref={instance => { if (instance != null && this.state.post_comment === undefined) {this.setState({post_comment: instance.postComment})} }} user={this.props.user} id={this.state.id} />
                <h1>Добавить комментарий:</h1>
                <AddComment user={this.props.user} postComment={this.state.post_comment} />
            </div>
        );
    }
}

export default ProductPage;
