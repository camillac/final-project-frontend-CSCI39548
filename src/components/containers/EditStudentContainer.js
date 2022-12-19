/*==================================================
EditStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditStudentView from '../views/EditStudentView';
import { editStudentThunk } from '../../store/thunks';

class EditStudentContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      image: "",
      gpa: "",
      campusId: "",
      redirect: false,
      redirectId: null
    };
  }

  // Capture input data when it is entered
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Take action after user click the submit button
  handleSubmit = async (event, prev) => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    let student = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        imageURL: this.state.imageURL,
        gpa: this.state.gpa,
        campusId: this.state.campusId,
        id: this.props.match.params.id
    };

    if(student.firstname===''){
      student.firstname=prev.firstname;
    }

    if(student.lastname===''){
      student.lastname=prev.lastname;
    }

    if(student.email===''){
      student.email=prev.email;
    }

    if(student.gpa===''){
      student.gpa=prev.gpa;
    }

    if(student.imageURL===''){
      student.imageURL=prev.imageURL;
    }

    if (student.campusId===''){
      student.campusId=prev.campusId;
    }

    // Edit student in back-end database
    await this.props.editStudent(student);

    // Update state, and trigger redirect to show the updated student
    this.setState({
      firstname: "",
      lastname: "",
      email: "",
      image: "",
      gpa: "",
      campusId: "",
      redirect: true,
      redirectId: student.id
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render updated student input form
  render() {
    // Redirect to updated student's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/student/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EditStudentView
          handleChange = {this.handleChange}
          handleSubmit={this.handleSubmit}
          student={this.props.student}
        />
      </div>
    );
  }
}

// The following 2 input arguments are passed to the "connect" function used by "EditStudentContainer" to connect to Redux Store.
// 1. The "mapState" argument specifies the data from Redux Store that the component needs.
// The "mapState" is called when the Store State changes, and it returns a data object of "student".
const mapState = (state) => {
  return {
    student: state.student,  // Get the State object from Reducer "student"
  };
};

// 2. The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        editStudent: (student) => dispatch(editStudentThunk(student)),
    })
}

// Export store-connected container by default
// EditStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditStudentContainer);
