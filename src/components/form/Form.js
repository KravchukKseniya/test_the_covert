import React from 'react';
import { connect } from "react-redux";
import uuid from "uuid";
import { onSubmitNewComment } from '../../actions'
import './Form.css';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        title: '',
        phone: '',
        text: '',
        validtitle: false,
        validphone: false,
        validtext: false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  static isValid(name, value) {
    switch (name) {
      case "title":
      {
        return (value.length > 4 && value.length < 81)
      }
      case "phone":
      {
        const regExpForPhone = /^((8|\+7)[ ]?)?(\(?\d{3}\)?[ ]?)?[\d\- ]{7,10}$/;
        return regExpForPhone.test(value);
      }
      case "text":
      {
        return (value.length > 0 && value.length < 128)
      }
      default:
      {
        return false
      }
    }
  }

  static getErrorMessage(name) {
    switch (name) {
      case "title":
      {
        return "Title should be more than 5 and less than 80 characters"
      }
      case "phone":
      {
        return "Invalid phone number. Try this format 8 (999) 123-45-64";
      }
      case "text":
      {
        return "The message must be not empty and contain no more than 128 characters"
      }
      default:
      {
        return " "
      }
    }
  }

  validField(e) {
    const {name, value} = e.target;
    const Error = document.getElementById(`${name}-error`);
    const valid = `valid${name}`;
    if (Form.isValid(name, value)) {
      Error.innerHTML = '';
      this.setState({...this.state, [valid]: true, [name]: value});
    } else {
      Error.innerHTML = Form.getErrorMessage(name);
      this.setState({...this.state, [valid]: false})
    }
  }

  onSubmit() {
    const newComment = {
      id: uuid(),
      header: this.state.title,
      phonenumber: this.state.phone,
      date: +new Date(),
      text: this.state.text
    };
    this.props.onSubmitNewComment(this.props.employee, newComment);
    document.getElementById('comment-form').reset();
    this.setState({
      ...this.state,
      validtitle: false,
      validphone: false,
      validtext: false
    })
  }

  render() {
    return (
      <form id="comment-form"
            className="comment-form">
        <span className="fields-title">title</span>
        <input type="text"
               placeholder="comment title"
               name="title"
               onBlur={(e) => this.validField(e)}/>
        <span className="comment-form-error" id="title-error"/>
        <span className="fields-title">your phone number</span>
        <input type="tel"
               placeholder="phone number"
               name="phone"
               onBlur={(e) => this.validField(e)}/>
        <span className="comment-form-error" id="phone-error"/>
        <textarea placeholder="your comment..."
                  name="text"
                  onBlur={(e) => this.validField(e)}/>
        <span className="comment-form-error" id="text-error"/>
        <input type="button"
               disabled={!this.state.validtitle || !this.state.validphone || !this.state.validtext}
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