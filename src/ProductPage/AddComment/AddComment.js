import React from "react";
import './AddComment.css';

class AddComment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comment_text: "",
            comment_mark: 1,
            first_star: true,
            second_star: false,
            third_star: false,
            fourth_star: false,
            fifth_star: false
        }
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

    render() {
        if (this.props.user == null) {
            return (
                <h2>Для оставления комментария необходимо авторизоваться.</h2>
            );
        }
        return (
            <div className="post-comment">
                <textarea className="post-comment-text" rows="3" value={this.state.comment_text}
                          onChange={(event) => this.setState({comment_text: event.target.value})}/>
                <div className="label-mark-wrapper">
                    <span>Оценка:</span>
                    <span className={"comment-" + this.getStarClass(1) + "-star"} onMouseOver={(event) => {
                        this.setState({
                            first_star: true,
                            second_star: false,
                            third_star: false,
                            fourth_star: false,
                            fifth_star: false,
                            comment_mark: 1
                        })
                    }}>&#9733;</span>
                    <span className={"comment-" + this.getStarClass(2) + "-star"} onMouseOver={(event) => {
                        this.setState({
                            first_star: true,
                            second_star: true,
                            third_star: false,
                            fourth_star: false,
                            fifth_star: false,
                            comment_mark: 2
                        })
                    }}>&#9733;</span>
                    <span className={"comment-" + this.getStarClass(3) + "-star"} onMouseOver={(event) => {
                        this.setState({
                            first_star: true,
                            second_star: true,
                            third_star: true,
                            fourth_star: false,
                            fifth_star: false,
                            comment_mark: 3
                        })
                    }}>&#9733;</span>
                    <span className={"comment-" + this.getStarClass(4) + "-star"} onMouseOver={(event) => {
                        this.setState({
                            first_star: true,
                            second_star: true,
                            third_star: true,
                            fourth_star: true,
                            fifth_star: false,
                            comment_mark: 4
                        })
                    }}>&#9733;</span>
                    <span className={"comment-" + this.getStarClass(5) + "-star"} onMouseOver={(event) => {
                        this.setState({
                            first_star: true,
                            second_star: true,
                            third_star: true,
                            fourth_star: true,
                            fifth_star: true,
                            comment_mark: 5
                        })
                    }}>&#9733;</span>
                </div>
                <button className="post-comment-button" onClick={() => {
                    this.setState({comment_text: ''});
                    console.log(this.props.postComment);
                    this.props.postComment(this.state.comment_mark, this.state.comment_text)
                }}>Отправить</button>
            </div>
        );
    }
}

export default AddComment;
