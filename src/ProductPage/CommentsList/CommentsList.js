import React from "react";
import './CommentsList.css';
import axios from "axios";
import Comment from "./Comment/Comment";

class CommentsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded_comments: false,
            comments: [],
        }

        this.postComment = this.postComment.bind(this);
        this.changeScore = this.changeScore.bind(this);
    }

    componentDidMount() {
        axios.get('/api/get/comments/' + this.props.id).then(res => {
            let comments = res.data.comments;
            this.setState({
                loaded_comments: true,
                comments: comments
            });
        });
    }

    async changeScore(event, id, value) {
        const data = {
            CommentId: id,
            Value: value
        };
        await axios.post('/api/add/change', data);

        let new_comments = this.state.comments;
        for (let i = 0; i < new_comments.length; ++i) {
            if (new_comments[i].id === id) {
                new_comments[i].score += value;
                new_comments[i].canRate = false;
            }
        }
        this.setState({comments: new_comments});
    }

    renderCommentsList() {
        let to_return = [];
        let comments = this.state.comments;
        comments.forEach((element) => {
            to_return.push(
                <Comment changeScore={this.changeScore} comment={element} />
            );
        })
        return to_return;
    }

    async postComment(comment_mark, comment_text) {
        let data = {
            ProductId: this.props.id,
            Mark: comment_mark,
            Text: comment_text,
            Author: this.props.user.login,
            Created: Date.now()
        }

        await axios.post('/api/add/comment', data).then(res => {
            let new_comments = this.state.comments;
            new_comments.push(res.data.comment);
            this.setState({comments: new_comments});
        });
    }

    render() {
        if (!this.state.loaded_comments) {
            return (
                <span>...</span>
            );
        }
        return (
            <div className="flex-column">
                {this.renderCommentsList()}
            </div>
        );
    }
}

export default CommentsList;
