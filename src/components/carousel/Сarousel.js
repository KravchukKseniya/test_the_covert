import React from 'react';
import {connect} from "react-redux";
import Gravatar from "react-gravatar";
import {Link} from "react-router-dom";
import uuid from 'uuid';
import navigate_before from "../../img/navigate_before.svg";
import navigate_next from "../../img/navigate_next.svg";
import './Carousel.css';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 1,
      left: 0
    };
    this.onLeftArrowClick = this.onLeftArrowClick.bind(this);
    this.onRightArrowClick = this.onRightArrowClick.bind(this);
    this.isLeftArrowVisible = this.isLeftArrowVisible.bind(this);
    this.isRightArrowVisible = this.isRightArrowVisible.bind(this);
  }

  getAvatars() {
    return this.props.users.map(user =>
      <Link key={uuid()} to={`/profile/${user.id}`}>
        <Gravatar email={`${user.email}`}
                  className="avatar-for-carousel"
                  size={100}
                  title={`${user.name} ${user.surname}`}/>
      </Link>
    )
  }

  isLeftArrowVisible() {
    return (Number(this.state.currentUser) === 1 ? "hidden" : "")
  }

  isRightArrowVisible() {
    return (Number(this.state.currentUser) === Number(this.props.users.length - 3) ? "hidden" : "")
  }

  onLeftArrowClick() {
    this.setState({
      ...this.state,
      currentUser: this.state.currentUser - 1,
      left: this.state.left + 110
    });
  }

  onRightArrowClick() {
    this.setState({
      ...this.state,
      currentUser: this.state.currentUser + 1,
      left: this.state.left - 110
    });
  }

  createStyleOffset() {
    const offset = this.state.left;
    return ({left: +offset + 'px'})
  }

  render() {
    return (
      <div>
        {this.props.users.length !== 0 &&
        <div className="main-container">
          <img src={navigate_before}
               className={this.isLeftArrowVisible()}
               onClick={this.onLeftArrowClick}
               alt="before"/>
          <div className="carousel-box">
            <div className="carousel"
                 style={this.createStyleOffset()}>
              <div className="avatar-container">
                {this.getAvatars()}
              </div>
            </div>
          </div>
          <img src={navigate_next}
               className={this.isRightArrowVisible()}
               onClick={this.onRightArrowClick}
               alt="next"/>
        </div>
        }
      </div>
    )
  }
}

const putStateToProps = (state) => ({
  users: state.users
});

export default connect(putStateToProps, null)(Carousel)