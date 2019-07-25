import React from 'react';
import { Link } from "react-router-dom";
import Gravatar from 'react-gravatar';
import { AVATAR_SMALL_SIZE } from "../../constants";
import './EmployeeCard.css';

const EmployeeCard = (props) => {
    const { employee } = props;
    return (
      <Link to={`/profile/${employee.id}`}>
        <div className="employee-card">
          <Gravatar email={`${employee.email}`}
                    size={AVATAR_SMALL_SIZE}
                    className="employee-card-avatar"/>
                    <div className="employee-card-info">
                      <span>Name: {employee.name}</span>
                      <span>Surname: {employee.surname}</span>
                      <span>Position: {employee.position}</span>
                    </div>
        </div>
      </Link>
    )
};

export default EmployeeCard