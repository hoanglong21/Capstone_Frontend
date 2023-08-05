import React, {useState, useEffect} from 'react'
import SidebarforAdmin from "./SidebarforAdmin";
import HeaderAdmin from "./HeaderAdmin";
import { Link, useParams } from 'react-router-dom';
import CommentService from "../../services/CommentService";

function ViewDetailComment() {
  const [comment, setComment] = useState([])
  const {id} = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const temp = (await CommentService.getCommentById(id)).data;
      setComment(temp);
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
              Comment Details
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
                      value={comment.created_date}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="small mb-1 fs-6">Creator By</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={comment.user?.username}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="small mb-1 fs-6">Comment ID</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={comment.id}
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
                      value={comment.modified_date}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="small mb-1 fs-6">Post Content</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={comment.post?.content}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="small mb-1 fs-6">Type</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={comment.commentType?.name}
                    />
                  </div>
                </div>
                <div className="row gx-3 mb-3">
                <div className="col-md-4">
                    <label className="small mb-1 fs-6">Study Set Name</label>
                    <input
                      className="form-control"
                      type="tel"
                      readOnly
                      value={comment.studySet?.title}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="small mb-1 fs-6">Test Name</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={comment.test?.title}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="small mb-1 fs-6">Parent</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={comment.root?.content}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="small mb-1 fs-6">Content</label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={comment.content}
                  />
                </div>
                <div className="text-center">
                  <Link className="btn btn-secondary me-4" to="/managecomment">
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

export default ViewDetailComment