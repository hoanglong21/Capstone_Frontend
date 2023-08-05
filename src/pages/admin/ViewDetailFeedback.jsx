import React, {useState, useEffect} from 'react'
import SidebarforAdmin from "./SidebarforAdmin";
import HeaderAdmin from "./HeaderAdmin";
import ReplyFeedback from './ReplyFeedback';
import { Link, useParams } from 'react-router-dom';
import FeedbackService from '../../services/FeedbackService';

function ViewDetailFeedback() {
  const [feedback, setFeedback] = useState([])
  const {id} = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const temp = (await FeedbackService.getFeedbackById(id)).data;
      setFeedback(temp);
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
              Feedback Details
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="small mb-1 fs-6">Feedback Title </label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={feedback.title}
                  />
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-md-4">
                    <label className="small mb-1 fs-6">Feedback ID</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={feedback.id}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="small mb-1 fs-6">Creator By</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={feedback?.user?.username}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="small mb-1 fs-6">Created Date</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={feedback.created_date}
                    />
                  </div>
                </div>
                <div className="row gx-3 mb-3">
                <div className="col-md-4">
                    <label className="small mb-1 fs-6">Feedback Type</label>
                    <input
                      className="form-control"
                      type="tel"
                      readOnly
                      value={feedback.feedbackType?.name}
                    />
                  </div>
                  <div className="col-md-8">
                    <label className="small mb-1 fs-6">Content</label>
                    <input
                      className="form-control"
                      type="tel"
                      readOnly
                      value={feedback.content}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <Link className="btn btn-secondary me-4" to="/managefeedback">
                    Close
                  </Link>
                  <button className="btn btn-primary" type="button" data-bs-toggle="modal"
                        data-bs-target="#replyModal">
                    Reply
                  </button>
                </div>
              </form>
            </div>
            <ReplyFeedback/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewDetailFeedback