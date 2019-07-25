import React from 'react';
import { connect } from "react-redux";
import { onSubmitNewComment } from '../../actions'
import './Form.css';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: {
        header: '',
        phonenumber: '',
        date: '',
        text: ''
      },
      validTitle: false,
      validPhone: false,
      validText: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.validTitle = this.validTitle.bind(this);
    this.validPhone = this.validPhone.bind(this);
    this.validText = this.validText.bind(this);
  }

  validTitle() {
    const commentTitle = document.getElementById('title').value;
    const titleError = document.getElementById('title-error');
    if (commentTitle.length > 4 && commentTitle.length < 81) {
      titleError.innerHTML = '';
      this.setState({...this.state, validTitle: true});
    } else {
      titleError.innerHTML = "Title should be more than 5 and less than 80 characters";
    }
  }

  validPhone() {
    const commentPhone = document.getElementById('phone').value;
    const phoneError = document.getElementById('phone-error');
    const regExpForPhone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    if (regExpForPhone.test(commentPhone)) {
      phoneError.innerHTML = '';
      this.setState({...this.state, validPhone: true})
    } else {
      phoneError.innerHTML = "Invalid phone number. Try this format 8 (999) 123-45-64";
    }
  }

  validText() {
    const commentText = document.getElementById('comment').value;
    const textError = document.getElementById('text-error');
    if (commentText.length > 0 && commentText.length < 128) {
      textError.innerHTML = '';
      this.setState({...this.state, validText: true})
    } else {
      textError.innerHTML = "The message must be not empty and contain no more than 128 characters";
    }
  }

  onSubmit() {
    const newComment = {
      header: document.getElementById('title').value,
      phonenumber: document.getElementById('phone').value,
      date: +new Date(),
      text: document.getElementById('comment').value
    };
    this.props.onSubmitNewComment(this.props.employee, newComment);
    document.getElementById('comment-form').reset();
    this.setState({...this.state, validTitle: false, validPhone: false, validText: false})
  }

  render() {
    return (
      <form id="comment-form"
            className="comment-form">
        <span className="fields-title">title</span>
        <input type="text"
               id="title"
               name="header"
               onBlur={this.validTitle}/>
        <span className="comment-form-error" id="title-error"> </span>
        <span className="fields-title">your phone number</span>
        <input type="tel"
               id="phone"
               onBlur={this.validPhone}/>
        <span className="comment-form-error" id="phone-error"> </span>
        <textarea placeholder="Your comment text..."
                  id="comment"
                  onBlur={this.validText}/>
        <span className="comment-form-error" id="text-error"> </span>
        <input type="button"
               id="submit"
               disabled={!this.state.validTitle || !this.state.validPhone || !this.state.validText}
               value="Submit"
               onClick={this.onSubmit}/>
      </form>
    )
  }
}

const mapDispatchToProps = {
  onSubmitNewComment: onSubmitNewComment
};

export default connect(null, mapDispatchToProps)(Form)