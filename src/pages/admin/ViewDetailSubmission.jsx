import React, {useState, useEffect} from 'react'
import SidebarforAdmin from "./SidebarforAdmin";
import HeaderAdmin from "./HeaderAdmin";
import { Link, useParams } from 'react-router-dom';
import SubmissionService from "../../services/SubmissionService";

function ViewDetailSubmission() {
  const [submission, setSubmission] = useState([])
  const {id} = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const temp = (await SubmissionService.getSubmissionById(id)).data;
      setSubmission(temp);
    };
    if (id) {
      fetchData();
    }
  }, [id]);
  
  return (
    <div className="container-fluid">
      <div className="row">
        <SidebarforAdmin />
        <div className="col-sm">
          <HeaderAdmin />
          <div className="card mb-4">
            <div className="card-header fs-5 fw-bold text-uppercase">
              Submission Details
            </div>
            <div className="card-body">
              <form>
                <div className="row gx-3 mb-3">
                  <div className="col-md-4">
                    <label className="small mb-1 fs-6">Create Date</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={submission.created_date}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="small mb-1 fs-6">Creator By</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={submission.user?.username}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="small mb-1 fs-6">Submission ID</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={submission.id}
                    />
                  </div>
                </div>
                <div className="row gx-3 mb-3">
                <div className="col-md-4">
                    <label className="small mb-1 fs-6">Modified Date</label>
                    <input
                      className="form-control"
                      type="tel"
                      readOnly
                      value={submission.modified_date}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="small mb-1 fs-6">Mark</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={submission.mark}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="small mb-1 fs-6">Assignment</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={submission.assignment?.title}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="small mb-1 fs-6">Description</label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={submission.description}
                  />
                </div>
                <div className="text-center">
                  <Link className="btn btn-secondary me-4" to="/managesubmission">
                    Close
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewDetailSubmission