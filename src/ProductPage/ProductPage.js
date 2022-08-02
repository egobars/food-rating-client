import React from "react";
import './ProductPage.css';
import axios from "axios";
import Comment from "./Comment/Comment";

class ProductPage extends React.Component {
    id = '';

    constructor(props) {
        super(props);

        this.state = {
            loaded_product: false,
            id: null,
            name: '',
            image: '',
            long_description: '',
            mark: 0,
            comments: [],
            comment_text: "",
            comment_mark: 1,
            counter: 0,
            first_star: true,
            second_star: false,
            third_star: false,
            fourth_star: false,
            fifth_star: false
        }

        this.postComment = this.postComment.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        let path = window.location.pathname;
        for (let i = path.length - 1; i > -1; --i) {
            if (path[i] === '/') {
                this.id = path.slice(i + 1, path.length);
                break;
            }
        }

        axios.get('/api/get/product/' + this.id).then(res => {
            let product = res.data.product;
            let comments = res.data.comments;
            this.setState({
                loaded_product: true,
                id: product.id,
                name: product.name,
                image: product.image,
                long_description: product.longDescription,
                mark: product.averageMark,
                comments: comments
            });
        });
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.counter !== this.state.counter) {
            axios.get('/api/get/product/' + this.id).then(res => {
                let product = res.data.product;
                let comments = res.data.comments;
                this.setState({
                    loaded_product: true,
                    id: product.id,
                    name: product.name,
                    image: product.image,
                    long_description: product.longDescription,
                    mark: product.averageMark,
                    comments: comments
                });
            });
        }
    }

    renderCommentsList() {
        let to_return = [];
        let comments = this.state.comments;
        comments.forEach((element) => {
            let date = new Date(element.created);
            to_return.push(
                <Comment refresh={this.refresh} id={element.id} text={element.text} mark={element.mark} user={element.author} date={date.toLocaleString()} score={element.score} canRate={element.canRate} />
            );
        })
        return to_return;
    }

    async postComment() {
        let data = {
            ProductId: this.state.id,
            Mark: this.state.comment_mark,
            Text: this.state.comment_text,
            Author: this.props.user.login,
            Created: Date.now()
        }

        await axios.post('/api/add/comment', data);
    }

    refresh() {
        this.setState({
            counter: this.state.counter + 1
        });
    }

    getStarClass(index) {
        if (index === 1) {
            if (this.state.first_star) {
                return "filled";
            } else {
                return "empty";
            }
        } else if (index === 2) {
            if (this.state.second_star) {
                return "filled";
            } else {
                return "empty";
            }
        } else if (index === 3) {
            if (this.state.third_star) {
                return "filled";
            } else {
                return "empty";
            }
        } else if (index === 4) {
            if (this.state.fourth_star) {
                return "filled";
            } else {
                return "empty";
            }
        } else if (index === 5) {
            if (this.state.fifth_star) {
                return "filled";
            } else {
                return "empty";
            }
        }
    }

    renderAddComment() {
        if (this.props.user == null) {
            return (
                <h2>Для оставления комментария необходимо авторизоваться.</h2>
            );
        }
        return (
            <div className="post-comment">
                <textarea className="post-comment-text" rows="3" value={this.state.comment_text} onChange={(event) => this.setState({comment_text: event.target.value})} />
                <div className="label-mark-wrapper">
                    <span>Оценка:</span>
                    <span className={"comment-" + this.getStarClass(1) + "-star"} onMouseOver={(event) => {console.log('a'); this.setState({
                        first_star: true,
                        second_star: false,
                        third_star: false,
                        fourth_star: false,
                        fifth_star: false,
                        comment_mark: 1
                    })}}>&#9733;</span>
                    <span className={"comment-" + this.getStarClass(2) + "-star"} onMouseOver={(event) => {this.setState({
                        first_star: true,
                        second_star: true,
                        third_star: false,
                        fourth_star: false,
                        fifth_star: false,
                        comment_mark: 2
                    })}}>&#9733;</span>
                    <span className={"comment-" + this.getStarClass(3) + "-star"} onMouseOver={(event) => {this.setState({
                        first_star: true,
                        second_star: true,
                        third_star: true,
                        fourth_star: false,
                        fifth_star: false,
                        comment_mark: 3
                    })}}>&#9733;</span>
                    <span className={"comment-" + this.getStarClass(4) + "-star"} onMouseOver={(event) => {this.setState({
                        first_star: true,
                        second_star: true,
                        third_star: true,
                        fourth_star: true,
                        fifth_star: false,
                        comment_mark: 4
                    })}}>&#9733;</span>
                    <span className={"comment-" + this.getStarClass(5) + "-star"} onMouseOver={(event) => {this.setState({
                        first_star: true,
                        second_star: true,
                        third_star: true,
                        fourth_star: true,
                        fifth_star: true,
                        comment_mark: 5
                    })}}>&#9733;</span>
                </div>
                <button className="post-comment-button" onClick={this.postComment}>Отправить</button>
            </div>
        );
    }

    render() {
        if (!this.state.loaded_product) {
            return (
                <span>...</span>
            );
        }
        return (
            <div className="product-content">
                <div className="product-overall">
                    <img src={this.state.image} width="400" height="400"></img>
                    <div className="product-name-description-rating">
                        <h1>{this.state.name}</h1>
                        <span className="product-long-description">{this.state.long_description}</span>
                        <div className="product-overall-rating-wrapper">
                            <span className="product-overall-rating-label">Оценка:</span>
                            <span className="product-overall-rating-mark">{(this.state.mark).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                <h1>Комментарии:</h1>
                <div className="flex-column">
                    {this.renderCommentsList()}
                </div>
                <h1>Добавить комментарий:</h1>
                {this.renderAddComment()}
            </div>
        );
    }
}

export default ProductPage;
