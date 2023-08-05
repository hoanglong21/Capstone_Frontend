import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import logo from "../../assets/images/logo-1.png";
import { Link } from "react-router-dom";
import "../../assets/styles/sidebar.css";

function SidebarforAdmin() {
  return (
    <div className="header__admin col-sm-2 col-lg-2 col-md-2 min-vh-100 d-flex justify-content-between flex-column wrapper align-items-stretch">
      <section id="navbar">
        <Link
          href=""
          className="text-decoration-none d-flex align-item center d-none d-sm-inline d-none d-sm-inline mt-2 "
        >
          <img className="img-thumbnail mt-2" src={logo} alt="" />
        </Link>
        <hr className="text-dark d-none d-sm-block" />
        <ul className="nav nav-pills flex-column mt-3 mt-sm-0">
          <li className="nav-item active fs-6 my-1 py-2 py-sm-0">
            <Link to="/dashboard" className="nav-link fs-7">
              <i className="bi bi-speedometer2"></i>
              <span className="ms-3 d-none d-sm-inline">
                Dashboard
              </span>
            </Link>
          </li>
          <li className="nav-item fs-6 my-1 py-2 py-sm-0">
            <Link to="/manageusers" className="nav-link fs-7">
              <i class="bi bi-person-square"></i>
              <span className="ms-3 d-none d-sm-inline">
                Manage User
              </span>
            </Link>
          </li>
          <li className="nav-item fs-6 my-1 py-2 py-sm-0">
            <Link to="/manageclass" className="nav-link fs-7">
              <i class="bi bi-people"></i>
              <span className="ms-3 d-none d-sm-inline">
                Class
              </span>
            </Link>
          </li>
          <li className="nav-item fs-6 my-1 py-2 py-sm-0">
            <Link to="/managefeedback" className="nav-link fs-7">
              <i class="bi bi-chat-text"></i>
              <span className="ms-3 d-none d-sm-inline">
                Feedback
              </span>
            </Link>
          </li>
          <li className="nav-item fs-6 my-1 py-2 py-sm-0">
            <Link to="/managestudyset" className="nav-link fs-7">
            <i class="bi bi-back"></i>
              <span className="ms-3 d-none d-sm-inline">
                Studyset
              </span>
            </Link>
          </li>
          <li className="nav-item fs-6 my-1 py-2 py-sm-0">
            <Link to="/manageassignment" className="nav-link fs-7">
            <i class="bi bi-file-zip-fill"></i>
              <span className="ms-3 d-none d-sm-inline">
                Assignment
              </span>
            </Link>
          </li>
          <li className="nav-item fs-6 my-1 py-2 py-sm-0">
            <Link to="/managetest" className="nav-link fs-7">
            <i class="bi bi-file-earmark-text"></i>
              <span className="ms-3 d-none d-sm-inline">
                Test
              </span>
            </Link>
          </li>
          <li className="nav-item fs-6 my-1 py-2 py-sm-0">
            <Link to="/managesubmission" className="nav-link fs-7">
            <i class="bi bi-archive"></i>
              <span className="ms-3 d-none d-sm-inline">
                Submission
              </span>
            </Link>
          </li>
          <li className="nav-item fs-6 my-1 py-2 py-sm-0">
            <Link to="/managepost" className="nav-link fs-7">
            <i class="bi bi-send-fill"></i>
              <span className="ms-3 d-none d-sm-inline">
                Post
              </span>
            </Link>
          </li>
          <li className="nav-item fs-6 my-1 py-2 py-sm-0">
            <Link to="/managecomment" className="nav-link fs-7">
            <i class="bi bi-question-circle"></i>
              <span className="ms-3 d-none d-sm-inline">
                Comment
              </span>
            </Link>
          </li>
          <li className="nav-item fs-6 my-1 py-2 py-sm-0">
            <Link to="/vocab" className="nav-link fs-7">
            <i class="bi bi-book"></i>
              <span className="ms-3 d-none d-sm-inline">
                Dictionary
              </span>
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default SidebarforAdmin;
