/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';


const AllCampusesView = (props) => {
  const {deleteCampus} = props;
  // If there is no campus, display a message.
  if (!props.allCampuses.length) {
    return (
    <div>
      <h2>There are no campuses.</h2>
      <Link to={`newcampus`}>
        <Button variant="contained" color="primary">
          Add New Campus
        </Button>
      </Link>
    </div>
    );
  }

  // If there is at least one campus, render All Campuses view
  return (
    <div>
      <h1>All Campuses</h1>

      {props.allCampuses.map((campus) => (
        <div key={campus.id}>
          <Link to={`/campus/${campus.id}`}>
            <h2>{campus.name}</h2>
          </Link>
          <img src={campus.imageURL} alt="Campus" width="500" height="350"/>

          <h4>Campus Id: {campus.id}</h4>
          <p>{campus.address}</p>
          <p>{campus.description}</p>
          <Button variant="contained" color="primary" onClick={() => deleteCampus(campus.id)}>
            Delete
          </Button>
          <hr/>
        </div>
      ))}
      <br/>
      <Link to={`/newcampus`}>
        <Button variant="contained" color="primary">
          Add New Campus
        </Button>
      </Link>
      <br/><br/>
    </div>
  );
};

// Validate data type of the props passed to component.
AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;
