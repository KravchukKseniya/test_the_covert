import React from 'react';
import { Link } from "react-router-dom";
import Gravatar from 'react-gravatar'
import './EmployeeCard.css';

class EmployeeCard extends React.Component {
  render() {
    return (
      <Link to={`/profile/${this.props.employee.id}`}>
        <div className="employee-card">
          <Gravatar email={`${this.props.employee.email}`}
                    size={100}
          className="employee-card-avatar"/>
                    <div className="employee-card-info">
                      <span>Name: {this.props.employee.name}</span>
                      <span>Surname: {this.props.employee.surname}</span>
                      <span>Position: {this.props.employee.position}</span>
                    </div>
        </div>
      </Link>
    )
  }
}

export default EmployeeCard