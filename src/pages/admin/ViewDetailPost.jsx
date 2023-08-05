import React, {useState, useEffect} from 'react'
import SidebarforAdmin from "./SidebarforAdmin";
import HeaderAdmin from "./HeaderAdmin";
import { Link, useParams } from 'react-router-dom';
import PostService from '../../services/PostService';

function ViewDetailPost() {
  const [post, setPost] = useState([])
  const {id} = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const temp = (await PostService.getPostById(id)).data;
      setPost(temp);
    };
    if (id) {
      fetchData();
    }
  }, [id]);
  
  console.log(post)
  return (
    <div className="container-fluid">
      <div className="row">
        <SidebarforAdmin />
        <div className="col-sm">
          <HeaderAdmin />
          <div className="card mb-4">
            <div className="card-header fs-5 fw-bold text-uppercase">
              Post Details
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="small mb-1 fs-6">Content</label>
                  <input
                    className="form-control"
                    type="text"
                    readOnly
                    value={post.content}
                  />
                </div>
                <div className="row gx-3 mb-3">
                  <div className="col-md-4">
                    <label className="small mb-1 fs-6">Create Date</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={post.created_date}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="small mb-1 fs-6">Creator By</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={post.user?.username}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="small mb-1 fs-6">Class Name</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={post.classroom?.class_name}
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
                      value={post.modified_date}
                    />
                  </div>
                  <div className="col-md-8">
                    <label className="small mb-1 fs-6">Post ID</label>
                    <input
                      className="form-control"
                      type="text"
                      readOnly
                      value={post.id}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <Link className="btn btn-secondary me-4" to="/managepost">
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

export default ViewDetailPost