/*==================================================
AllStudentsView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the all students view page.
================================================== */
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

const AllStudentsView = (props) => {
  const {students, deleteStudent} = props;
  // If there is no student, display a message
  if (!students.length) {
    return (
    <div>
      <h2>There are no students.</h2>
      <Link to={`newstudent`}>
        <Button variant="contained" color="primary">
          Add New Student
        </Button>
      </Link>
    </div>
    );
  }

  // If there is at least one student, render All Students view
  return (
    <div>
      <h1>All Students</h1>

      {students.map((student) => {
          let name = student.firstname + " " + student.lastname;
          return (
            <div key={student.id}>
              <Link to={`/student/${student.id}`}>
                <h2>{name}</h2>
              </Link>
              <img src={student.imageURL} alt="Student" width="200" height="200"/>
              <br></br>
              <br></br>

              <Button variant="contained" color="primary" onClick={() => deleteStudent(student.id)}>
                Delete
              </Button>
              <hr/>
            </div>
          );
        }
      )}
      <br/>
      <Link to={`/newstudent`}>
        <Button variant="contained" color="primary">
          Add New Student
        </Button>
      </Link>
      <br/><br/>
    </div>
  );
};


export default AllStudentsView;
