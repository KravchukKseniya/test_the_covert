import React from 'react';
import { connect } from 'react-redux';
import Gravatar from "react-gravatar";
import { Link } from "react-router-dom";
import CommentCard from "../commentCard/CommentCard";
import { getEmployees } from "../../actions";
import { COMMENTS_PER_PAGE, AVATAR_BIG_SIZE } from "../../constants";
import Form from "../form/Form";
import Carousel from "../carousel/Сarousel";
import navigate_before from "../../img/navigate_before.svg";
import { selectUserId } from "../../selectors";
import './Profile.css';

class Profile extends React.Component {
  componentDidMount() {
    if (this.props.users.length === 0) {
      this.props.getEmployees();
    }
  }

  getCommentCards() {
    const { comments } = this.props.selectedUser;
    comments.sort((commentA, commentB) => {
      return commentA.date - commentB.date;
    });
    const commentCards = comments.map(comment =>
      <CommentCard key={comment.id} comment={comment}/>
    );
    return commentCards.splice(-COMMENTS_PER_PAGE)
  }

  render() {
    const {selectedUser} = this.props;
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
        {selectedUser &&
        <div>
          <div className="profile-box-about-employee">
            <div className="profile-box-avatar">
              <Gravatar email={`${selectedUser.email}`}
                        size={AVATAR_BIG_SIZE}/>
            </div>
            <div className="profile-box-info">
              <span className="profile-box-info-fields">
                <span className="fields-title">Name: </span>
                {selectedUser.name}
              </span>
              <span className="profile-box-info-fields">
                <span className="fields-title">
                  Surname:
                </span>
                {selectedUser.surname}
              </span>
              <span className="profile-box-info-fields">
                <span className="fields-title">
                  Position:
                </span>
                {selectedUser.position}
              </span>
              <span className="profile-box-info-fields">
                <span className="fields-title">
                  Address:
                </span>
                {selectedUser.address}
              </span>
            </div>
          </div>
          <div>
            {this.getCommentCards()}
          </div>
          <Form employee={selectedUser.id}/>
        </div>
        }
      </div>
    )
  }
}

const mapDispatchToProps = {
  getEmployees: getEmployees
};

const putStateToProps = (state, props) => ({
  users: state.users,
  selectedUser: selectUserId(state, props.match.params.id)
});

export default connect(putStateToProps, mapDispatchToProps)(Profile)