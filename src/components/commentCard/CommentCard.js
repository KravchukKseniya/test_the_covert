import React from 'react';
import moment from "moment/moment";
import './CommentCard.css';

class CommentCard extends React.Component {
  render(){
    return(
      <div className="comment-box">
        <div className="comment-box-date">
          {moment(+this.props.comment.date).format('LL')}
        </div>
        <div>
          <h3>{this.props.comment.header}</h3>
          <p>{this.props.comment.text}</p>
        </div>
      </div>
    )
  }
}

export default CommentCard