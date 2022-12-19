/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';


const StudentView = (props) => {
  const { student, deleteStudent } = props;

  // Render a single Student view
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <img src={student.imageURL} alt="Student" width="200" height="200"/>
      {student.campus != null ?
        <Link to={`/campus/${student.campus.id}`}>
          <h3>{student.campus.name}</h3>
        </Link>
      :
        <h3>Currently Not Enrolled In A Campus</h3>
      }
      <h4>Email: {student.email}</h4>
      {student.gpa != null ?
        <h4> GPA: {student.gpa.toFixed(1)} </h4>
        :
        <h4>GPA: n/a</h4>
      }

      <Link to={`/editstudent/${student.id}`}>
        <Button variant="contained" color="primary">Edit Student</Button>
      </Link>

      <br></br>
      <br></br>

      <Link to={`/students`}>
        <Button variant="contained" color="primary" onClick={() => deleteStudent(student.id)}>
          Delete Student
        </Button>
      </Link>
    </div>
  );

};

export default StudentView;
