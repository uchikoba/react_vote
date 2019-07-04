import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

let employees_array = [];

class App extends React.Component {
  state = {
    employees : [],
    entryName : '',
  };

  componentDidMount() {
    this.setState({ employees : employees_array });
  }

  plusOne = memberId => {
    const updatedEmployees = this.state.employees.map(employee => {
      if (employee.id == memberId) {
        return Object.assign({}, employee, {
          votes : employee.votes + 1
        });
      } else {
        return employee;
      }
    });

    this.setState({
      employees : updatedEmployees
    });
  };

  minusOne = memberId => {
    const updatedEmployees = this.state.employees.map(employee => {
      if (employee.id == memberId) {
        return Object.assign({}, employee, {
          votes : employee.votes - 1
        });
      } else {
        return employee;
      }
    });

    updatedEmployees.some(function (v, i) {
      if (v.votes <= 0) updatedEmployees.splice(i, 1);
    });

    this.setState({
      employees : updatedEmployees
    });
  };

  addEmployee = () => {
    let updatedEmployees = this.state.employees;
    let newId = 0;
    if (updatedEmployees.length <= 0) {
      newId = 1;
    } else {
      newId = Math.max.apply(null, updatedEmployees.map(function (o) { return o.id; })) + 1;
    }
    updatedEmployees.push({
      id    : newId,
      name  : this.state.entryName,
      votes : 1
    });

    this.setState({
      employees : updatedEmployees,
      entryName : ''
    });
  };
  
  sortEmployees = () => {
    let updatedEmployees = this.state.employees;

    updatedEmployees.sort(function (a, b) {
      if (a.votes < b.votes) {
        return 1;
      }
      if (a.votes > b.votes) {
        return -1;
      }
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });

    this.setState({
      employees : updatedEmployees
    });
  }

  render() {
    const rows = this.state.employees.map(employee =>
      <Employee
        key={employee.id}
        id={employee.id}
        name={employee.name}
        votes={employee.votes}
        plusOne={this.plusOne}
        minusOne={this.minusOne}
      />
    );
    return (
      <table>
        <thead>
          <tr>
            <td colspan="4">
              <label>Name&nbsp;
                <input type="text" placeholder="社員名" value={this.state.entryName} onChange={e => this.setState({entryName: e.target.value})}/>&nbsp;
              </label>
              <button onClick={this.addEmployee}>Add New</button>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Votes</th>
            <th>Vote!</th>
          </tr>
          {rows}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4" class="right">
              <button onClick={this.sortEmployees}>Sort</button>
            </td>
          </tr>
        </tfoot>
      </table>
    );
    return this.state.employees.map(employee =>
      <Employee
        key={employee.id}
        id={employee.id}
        name={employee.name}
        votes={employee.votes}
        plusOne={this.plusOne}
        minusOne={this.minusOne}
      />
    );
  }
}

class Employee extends React.Component {
  plusOne = () => this.props.plusOne(this.props.id);

  minusOne = () => this.props.minusOne(this.props.id);

  render () {
    return (
      <tr>
        <td width="20%">{this.props.id}</td>
        <td width="40%">{this.props.name}</td>
        <td width="20%" class="right">{this.props.votes}</td>
        <td width="20%" class="button">
          <button onClick={this.plusOne}>+1</button>&nbsp;&nbsp;<button onClick={this.minusOne}>-1</button>
        </td>
      </tr>
    );
  }
}

// ==================================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
