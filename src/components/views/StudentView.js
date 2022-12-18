/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
const StudentView = (props) => {
  const { student } = props;

  // Render a single Student view
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <img src={student.imageURL} alt="https://images.squarespace-cdn.com/content/v1/58962c6a440243be53fd739d/1501788229215-54S3CNHM498H1OIP929E/image-asset.gif" width="200" height="200"/>
      <h3>{student.campus.name}</h3>
    </div>
  );

};

export default StudentView;
