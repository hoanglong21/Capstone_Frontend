import React, { useState, useEffect } from "react";
import SidebarforAdmin from "./SidebarforAdmin";
import HeaderAdmin from "./HeaderAdmin";
import { Link, useParams } from "react-router-dom";
import StudySetService from "../../services/StudySetService";

function ViewDetailStudyset() {
  const [studySet, setStudySet] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const tempStudySet = (await StudySetService.getStudySetById(id)).data;
      setStudySet(tempStudySet);
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
              StudySet Details
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="small mb-1 fs-6">StudySet Title </label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={studySet?.title}
                  />
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-md-4">
                    <label className="small mb-1 fs-6">StudySet ID</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={studySet?.id}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="small mb-1 fs-6">Creator By</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={studySet?.user?.username}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="small mb-1 fs-6">Created Date</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={studySet?.created_date}
                    />
                  </div>
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-md-4">
                    <label className="small mb-1 fs-6">Type</label>
                    <input
                      className="form-control"
                      type="tel"
                      readOnly
                      value={studySet?.studySetType?.name}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="small mb-1 fs-6">Status</label>
                    <input
                      className="form-control"
                      type="tel"
                      readOnly
                      value={studySet?.is_public == 1 ? "Public" : "Private"}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="small mb-1 fs-6">Deleted Date</label>
                    <input
                      className="form-control"
                      type="tel"
                      readOnly
                      value={studySet?.deleted_date}
                    />
                  </div>
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-md-12">
                    <label className="small mb-1 fs-6">Description</label>
                    <input
                      className="form-control"
                      type="tel"
                      readOnly
                      value={studySet?.description}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <Link className="btn btn-secondary me-4" to="/managestudyset">
                    Close
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewDetailStudyset;
