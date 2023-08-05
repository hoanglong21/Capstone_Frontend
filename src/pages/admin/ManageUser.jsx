import React, { useState, useEffect } from "react";
import SidebarforAdmin from "./SidebarforAdmin";
import { Link, useNavigate } from "react-router-dom";
import BanUser from "./BanUser";
import UnBanUser from "./UnBanUser";
import HeaderAdmin from "./HeaderAdmin";
import { useSearchParams } from "react-router-dom";
import UserService from '../../services/UserService'

function ManageUser() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search");
  const [users, setUsers] = useState([]);
  const fetchData = async (searchKey) => {
    const temp = (
        await UserService.filterUser(
            '',
            `${searchKey ? '=' + searchKey : ''}`,
            '',
            '',
            '',
            '=tutor,learner',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '=15'
        )
    ).data.list
    setUsers(temp)
}

useEffect(() => {
    fetchData(search ? search : '')
}, [search])


  return (
    <div className="container-fluid">
      <div className="row">
        <SidebarforAdmin />
        <div className="col-sm">
          <HeaderAdmin />
          <div className="container">
            <h3 className="mt-3 mb-4 text-bold text-black">Management Users</h3>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead style={{ backgroundColor: "#000" }}>
                  <tr>
                    <th scope="col">User ID</th>
                    <th scope="col">Username - Role</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Active</th>
                  </tr>
                </thead>
                <tbody>
                {users?.length === 0 && (
                                        <p>No data matching {search} found</p>
                                    )}
                  {users?.map((user) => (
                    <tr>
                      <th scope="row">{user?.id}</th>
                      <td>
                        <p className="text-info mb-0">{user?.username}</p>
                        {user?.role}
                      </td>
                      <td>{user?.email}</td>
                      <td>{user?.phone}</td>
                      <td>
                        <Link
                          type="button"
                          className="btn btn-primary me-3"
                          to={`/viewdetailuser/${user.username}`}
                        >
                          <i class="bi bi-info-square me-2"></i>
                          View Details
                        </Link>
                        <button
                          type="button"
                          className="btn btn-success me-3"
                          data-bs-toggle="modal"
                          data-bs-target={`#unbanModal${user?.username}`}
                        >
                          <i class="bi bi-person-fill-check me-2"></i>
                          Unban
                        </button>
                        <UnBanUser user={user}/>
                        <button
                          type="button"
                          className="btn btn-danger "
                          data-bs-toggle="modal"
                          data-bs-target={`#banModal${user?.username}`}
                        >
                          <i class="bi bi-person-fill-slash me-2"></i>
                          Ban
                        </button>
                        <BanUser user={user}/>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ManageUser;
