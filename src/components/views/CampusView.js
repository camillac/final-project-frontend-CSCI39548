/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, deleteCampus} = props;

  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <img src={campus.imageURL} alt="Campus Image" width="500" height="350"/>
      <p>{campus.address}</p>
      <p>{campus.description}</p>

      <Link to={`/campuses`}>
        <button onClick={() => deleteCampus(campus.id)}>Delete Campus</button>
      </Link>

      <div>
        {campus.students.length !== 0 ?
          <div>
            <h2>Students:</h2>
              {campus.students.map( student => {
                let name = student.firstname + " " + student.lastname;
                return (
                  <div key={student.id}>
                    <Link to={`/student/${student.id}`}>
                      <h3>{name}</h3>
                    </Link>
                  </div>
                );
              })}
          </div>
          :
          <h3> There Are Currently No Students Enrolled In This Campus </h3>
        }
      </div>
    </div>
  );
};

export default CampusView;
