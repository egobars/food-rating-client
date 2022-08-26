import React from "react";
import './Comment.css';

class Comment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false
        }
    }

    render() {
        return (
            <div className="comment">
                <div className="comment-user-date-panel">
                    <span>{this.props.comment.author}</span>
                    <span>{new Date(this.props.comment.created).toLocaleString()}</span>
                </div>
                <hr />
                <span>{this.props.comment.text}</span>
                <div className="comment-mark-score-panel">
                    <div className="comment-mark-panel">
                        <span>Оценка:</span>
                        <span className="comment-mark-panel-mark">{this.props.comment.mark}</span>
                    </div>
                    <div className="comment-score-panel">
                        <button disabled={!this.props.comment.canRate} onClick={(event) => {this.props.changeScore(event, this.props.comment.id, 1)}}>+</button>
                        <span>{this.props.comment.score}</span>
                        <button disabled={!this.props.comment.canRate} onClick={(event) => {this.props.changeScore(event, this.props.comment.id, -1)}}>-</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Comment;
