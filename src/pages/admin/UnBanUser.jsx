import React, { useState, useEffect } from "react";
import UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";

const UnBanUser = ({ user }) => {
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const [unbanUser, setUnBanUser] = useState({});

  useEffect(() => {
    if (user.username) {
      setUnBanUser({ ...user });
    }
  }, [user]);

  const handleUnBan = async () => {
    try {
      await UserService.recoverUser(user.username);
      document.getElementsById(`closeUnBanModal${user?.username}`).click();
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div
      className="modal"
      tabindex="-1"
      role="dialog"
      id={`unbanModal${user?.username}`}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">UNBAN USERS</h5>
            <button
              type="button"
              id={`closeUnBanModal${user?.username}`}
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>Are you sure unban user {user.username} ?</p>
          </div>
          <div className="modal-footer">
            <button type="button" class="btn btn-success" onClick={handleUnBan}>
              Sure!
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnBanUser;
