/*==================================================
EditCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditCampusView from '../views/EditCampusView';
import { editCampusThunk } from '../../store/thunks';

class EditCampusContainer extends Component {
  // Initialize state
  constructor(props){
    console.log(props);
    super(props);
    this.state = {
      name: "",
      address: "",
      description: "",
      imageURL: "",
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

    let campus = {
        name: this.state.name,
        address: this.state.address,
        description: this.state.description,
        imageURL: this.state.imageURL,
        id: this.props.match.params.id
    };

    if(campus.name===''){
      campus.name=prev.name;
    }

    if(campus.address===''){
      campus.address=prev.address;
    }

    if(campus.description===''){
      campus.description=prev.description;
    }

    if(campus.imageURL===''){
      campus.imageURL=prev.imageURL;
    }

    // Add edit campus in back-end database
    let editCampus = await this.props.editCampus(campus);

    // Update state, and trigger redirect to show the updated campus
    this.setState({
      name: "",
      address: "",
      description: "",
      imageURL: "",
      redirect: true,
      redirectId: campus.id
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false, redirectId: null});
  }

  // Render edit campus input form
  render() {
    // Redirect to updated campus' page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/campus/${this.state.redirectId}`}/>)
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EditCampusView
          handleChange = {this.handleChange}
          handleSubmit={this.handleSubmit}
          campus={this.props.campus}
        />
      </div>
    );
  }
}

// The following 2 input arguments are passed to the "connect" function used by "EditCampusContainer" to connect to Redux Store.
// 1. The "mapState" argument specifies the data from Redux Store that the component needs.
// The "mapState" is called when the Store State changes, and it returns a data object of "campus".
const mapState = (state) => {
  return {
    campus: state.campus,  // Get the State object from Reducer "student"
  };
};

// 2. The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
    return({
        editCampus: (campus) => dispatch(editCampusThunk(campus)),
    })
}

// Export store-connected container by default
// EditCampusContainer uses "connect" function to connect to Redux Store and to read values from the Store
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditCampusContainer);
