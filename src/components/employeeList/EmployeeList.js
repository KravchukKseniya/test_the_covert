import React from 'react';
import {connect} from 'react-redux';
import {getEmployees, addNewEmployeeToState} from '../../actions'
import EmployeeCard from "../employeeCard/EmployeeCard";
import './EmployeeList.css';

class EmployeeList extends React.Component {
  constructor(props) {
    super(props);
    this.addNewEmployee = this.addNewEmployee.bind(this);
  }

  componentDidMount() {
    if (this.props.users.length === 0) {
      this.props.getEmployees();
    }
  }

  getEmployeeCards() {
    return this.props.users.map(user =>
      <EmployeeCard key={user.id} employee={user}/>);
  }

  addNewEmployee() {
    this.props.addNewEmployeeToState();
  }

  render() {
    return (
      <div className="employee-list-box">
        {this.props.users.length !== 0 &&
        <div className="employee-list">
          <h1>Employee List</h1>
          <div className="employee-cards-box">
            {this.getEmployeeCards()}
          </div>
        </div>
        }
        <button onClick={this.addNewEmployee}>Add new employee</button>
      </div>
    )
  }
}

const mapDispatchToProps = {
  getEmployees: getEmployees,
  addNewEmployeeToState: addNewEmployeeToState
};

const putStateToProps = (state) => ({
  users: state.users
});

export default connect(putStateToProps, mapDispatchToProps)(EmployeeList)