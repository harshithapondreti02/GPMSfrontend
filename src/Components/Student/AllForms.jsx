import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function AllForms() {
  const BackendUrl = useSelector((state) => state.GlobalValues.BackendUrl);
  const host = BackendUrl;
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await fetch(`${host}/api/data/student/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authtoken: localStorage.getItem("authtoken_student")
          },
        });

        const data = await response.json();

        if (data.success) {
          setForms(data.forms);
        } else {
          console.error('Failed to fetch forms:', data.message);
        }
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchForms();
  }, [host]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">All Forms</h2>
      <div className="row">
        {forms.map((form) => (
          <div className="col-md-4 mb-4" key={form._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Reason: {form.reason}</h5>
                <p className="card-text">Roll No: {form.rollno}</p>
                <p className="card-text">Name: {form.name}</p>
                <p className="card-text">Date & Time: {new Date(form.dateTime).toLocaleString()}</p>
                <p className="card-text">Teacher Accepted: {form.teacher_accepted.toString()}</p>
                <p className="card-text">Teacher Rejected: {form.teacher_rejected.toString()}</p>
                <p className="card-text">Parent Accepted: {form.parent_accepted.toString()}</p>
                <p className="card-text">Parent Rejected: {form.parent_rejected.toString()}</p>
                <p className="card-text">Admin Accepted: {form.admin_accepted.toString()}</p>
                <p className="card-text">Admin Rejected: {form.admin_rejected.toString()}</p>
                <p className="card-text">Sent Out: {form.sent_out.toString()}</p>
                <p className="card-text">Teacher Name: {form.teacher_name}</p>
                <p className="card-text">Administration Name: {form.administration_name}</p>
                <p className="card-text">Teacher Message: {form.teacher_message}</p>
                <p className="card-text">Parent Message: {form.parent_message}</p>
                <p className="card-text">Admin Message: {form.admin_message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllForms;
