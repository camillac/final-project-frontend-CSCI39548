/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';


// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, deleteCampus, allStudents, editStudent} = props;
  let enrolledStudents = allStudents.filter(student => student.campusId===campus.id);
  let unenrolledStudents = allStudents.filter(student => student.campusId!==campus.id);

  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <img src={campus.imageURL} alt="Campus" width="500" height="350"/>
      <p>{campus.address}</p>
      <p>{campus.description}</p>

      <Link to={`/editcampus/${campus.id}`}>
        <Button variant="contained" color="primary">Edit Campus</Button>
      </Link>

      <br></br>
      <br></br>

      <Link to={`/campuses`}>
        <Button variant="contained" color="primary" onClick={() => deleteCampus(campus.id)}>
          Delete Campus
        </Button>
      </Link>


      <div>
        <h2>Current Students:</h2>
          {enrolledStudents.map( student => {
            let name = student.firstname + " " + student.lastname;
            return (
              <div key={student.id}>
                <Link to={`/student/${student.id}`}>
                  <h3>{name}</h3>
                </Link>
                <Button variant="contained" color="primary" onClick={() => editStudent({id: student.id, campusId: null, campus: null})}>
                  Unenroll
                </Button>
              </div>
            );
          })}

      <br></br>
      <br></br>
      </div>
      <div>
        <h2>Enroll New/Existing Students:</h2>
          {unenrolledStudents.map( student => {
            let name = student.firstname + " " + student.lastname;
            return (
              <div key={student.id}>
                <Link to={`/student/${student.id}`}>
                  <h3>{name}</h3>
                </Link>
                <Button variant="contained" color="primary" onClick={() => editStudent({id: student.id, campusId: campus.id, campus: campus})}>
                  Enroll
                </Button>
              </div>
            );
          })}

          <br></br>
          <br></br>
          </div>

      <Link to={`/newstudent`}>
        <Button variant="contained" color="primary">Add New Student</Button>
      </Link>
      <br></br>
      <br></br>

    </div>
  );
};

export default CampusView;
