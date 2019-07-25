import React from 'react';
import moment from "moment/moment";
import './CommentCard.css';

const CommentCard = (props) => {
    const { comment } = props;
    return(
      <div className="comment-box">
        <div className="comment-box-date">
          {moment(+comment.date).format('LL')}
        </div>
        <div>
          <h3>{comment.header}</h3>
          <p>{comment.text}</p>
        </div>
      </div>
    )
};

export default CommentCard