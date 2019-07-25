import React from 'react';
import { connect } from 'react-redux';
import Gravatar from "react-gravatar";
import { Link } from "react-router-dom";
import uuid from "uuid";
import CommentCard from "../commentCard/CommentCard";
import { getEmployees } from "../../actions";
import { COMMENTS_PER_PAGE } from "../../constants";
import Form from "../form/Form";
import Carousel from "../carousel/Сarousel";
import navigate_before from "../../img/navigate_before.svg";
import './Profile.css';

class Profile extends React.Component {
  componentDidMount() {
    if (this.props.users.length === 0) {
      this.props.getEmployees();
    }
  }

  getCommentCards() {
    this.props.selectUser[0].comments.sort(function (commentA, commentB) {
      return commentA.date - commentB.date;
    });
    const commentCards = this.props.selectUser[0].comments.map(comment =>
      <CommentCard key={uuid()} comment={comment}/>
    );
    return commentCards.splice(-COMMENTS_PER_PAGE)
  }

  render() {
    return (
      <div className="profile-box">
        <Carousel/>
        <Link to={"/"}>
          <div className="to_employee_list_button">
            <img src={navigate_before} alt="to_employee_list"/>
            <span>To Employee List</span>
          </div>
        </Link>

        <h1>Profile</h1>
        {this.props.selectUser.length !== 0 &&
        <div>
          {console.log(this.props)}
          <div className="profile-box-about-employee">
            <div className="profile-box-avatar">
              <Gravatar email={`${this.props.selectUser[0].email}`}
                        size={150}/>
            </div>
            <div className="profile-box-info">
              <span className="profile-box-info-fields">
                <span className="fields-title">Name: </span>
                {this.props.selectUser[0].name}
              </span>
              <span className="profile-box-info-fields">
                <span className="fields-title">
                  Surname:
                </span>
                {this.props.selectUser[0].surname}
              </span>
              <span className="profile-box-info-fields">
                <span className="fields-title">
                  Position:
                </span>
                {this.props.selectUser[0].position}
              </span>
              <span className="profile-box-info-fields">
                <span className="fields-title">
                  Address:
                </span>
                {this.props.selectUser[0].address}
              </span>
            </div>
          </div>
          <div>
            {this.getCommentCards()}
          </div>
          <Form employee={this.props.selectUser[0].id}/>
        </div>
        }
      </div>
    )
  }
}

const selectUserId = (state, id) => {
  return state.users.filter(user => user.id === id);
};

const mapDispatchToProps = {
  getEmployees: getEmployees
};

const putStateToProps = (state, props) => ({
  users: state.users,
  selectUser: selectUserId(state, props.match.params.id)
});

export default connect(putStateToProps, mapDispatchToProps)(Profile)