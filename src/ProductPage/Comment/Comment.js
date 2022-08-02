import React from "react";
import './Comment.css';
import axios from "axios";

class Comment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false
        }
        this.changeScore = this.changeScore.bind(this);
    }

    async changeScore(event, id, value) {
        const data = {
            CommentId: id,
            Value: value
        };
        await axios.post('/api/add/change', data);
        this.props.refresh();
    }

    render() {
        return (
            <div className="comment">
                <div className="comment-user-date-panel">
                    <span>{this.props.user}</span>
                    <span>{this.props.date}</span>
                </div>
                <hr />
                <span>{this.props.text}</span>
                <div className="comment-mark-score-panel">
                    <div className="comment-mark-panel">
                        <span>Оценка:</span>
                        <span className="comment-mark-panel-mark">{this.props.mark}</span>
                    </div>
                    <div className="comment-score-panel">
                        <button disabled={!this.props.canRate} onClick={(event) => {this.changeScore(event, this.props.id, 1)}}>+</button>
                        <span>{this.props.score}</span>
                        <button disabled={!this.props.canRate} onClick={(event) => {this.changeScore(event, this.props.id, -1)}}>-</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Comment;
