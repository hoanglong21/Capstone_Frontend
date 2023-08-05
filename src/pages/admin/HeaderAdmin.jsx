import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../../assets/styles/sidebar.css";
import {
  SettingIcon,
  LogoutIcon,
} from "../../components/icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { logout as authLogout } from "../../features/auth/authSlice";
import { logout as userLogout } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from "../../features/user/userAction";
import { useState } from "react";
import defaultAvatar from "../../assets/images/avatar-default.jpg";

function HeaderAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");
  const { userToken } = useSelector((state) => state.auth);
  const { userInfo } = useSelector((state) => state.user);

  const [showLogoutMess, setShowLogoutMess] = useState(false);

  useEffect(() => {
    if (userToken) {
      dispatch(getUser(userToken));
    }
  }, [userToken, dispatch]);

  const toggleShowLogoutMess = () => setShowLogoutMess(!showLogoutMess);

  const handleLogout = () => {
    dispatch(userLogout());
    dispatch(authLogout());
    toggleShowLogoutMess();
    navigate("/");
  };

  return (
    <>
      <nav className="navbar bg-white">
        <form className="d-flex w-50" role="search">
          <input
            class="form-control ms-3 me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={search || ""}
            onChange={(event) =>
              setSearchParams({
                search: event.target.value,
              })
            }
          />
          <button
            class="btn btn-primary"
            onClick={(event) => {
              event.preventDefault();
            }}
          >
            Search
          </button>
        </form>
        <div className="dropdown d-inline-flex">
          <button
            className="btn btn-avatar pe-0"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={userInfo?.avatar ? userInfo?.avatar : defaultAvatar}
              alt="avatar"
              className="avatar me-3"
            />
          </button>
          <ul className="dropdown-menu dropdown-menu-end p-2">
            <li>
              <div className="dropdown-header d-flex align-items-center">
                <div className="flex-shrink-0">
                  <img
                    src={userInfo?.avatar ? userInfo?.avatar : defaultAvatar}
                    alt="avatar"
                    className="avatar"
                  />
                </div>
                <div className="flex-grow-1 ms-3">
                  <p className="fw-semibold"> {userInfo?.username}</p>
                  <p
                    className="text-truncate"
                    style={{
                      maxWidth: "8rem",
                    }}
                  >
                    {userInfo?.email}
                  </p>
                </div>
              </div>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link
                className="dropdown-item py-2 px-3"
                type="button"
                to="/account"
              >
                <SettingIcon className="me-3" strokeWidth="2" />
                <span className="align-middle fw-semibold">Settings</span>
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button
                className="dropdown-item py-2 px-3"
                type="button"
                onClick={handleLogout}
              >
                <LogoutIcon className="me-3" strokeWidth="2" />
                <span className="align-middle fw-semibold">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <hr className="text-secondary d-none d-sm-block mt-0" />
    </>
  );
}

export default HeaderAdmin;
