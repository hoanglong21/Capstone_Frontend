import React, { useState, useEffect } from "react";
import SidebarforAdmin from "./SidebarforAdmin";
import HeaderAdmin from "./HeaderAdmin";
import { Link } from "react-router-dom";
import AssignmentService from "../../services/AssignmentService";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

function ManageFeedback() {
  const [assignments, setAssignments] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState("");

  const search = searchParams.get("search");

  const fetchData = async (searchKey) => {
    let temp;
    try {
      temp = (
        await AssignmentService.getFilterList(
          '',
          `${searchKey ? '=' + searchKey : ''}`,
          '',
          '',
          '',
          '',
          '',
          '',
          "=10"
        )
      ).data.list;
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data);
      } else {
        setError(error.message);
      }
      return console.log(error);
    }
    setAssignments(temp);
  };

  useEffect(() => {
    fetchData(search ? search : "");
  }, [search]);

  return (
    <div className="container-fluid">
      <div className="row">
        <SidebarforAdmin />
        <div className="col-sm">
          <HeaderAdmin />
          <div className="container">
            <h3 className="mt-3 mb-4 text-bold text-black">
              View Assignment
            </h3>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead style={{ backgroundColor: "#000" }}>
                  <tr>
                    <th scope="col">Assignment ID</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Title</th>
                    <th scope="col">ClassName</th>
                    <th scope="col">Author</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                {assignments?.length === 0 && (
                                        <p>No data matching {search} found</p>
                                    )}
                  {assignments?.map((assign) => (
                    <tr>
                      <th scope="row" key={assign.id}>
                        {assign?.id}
                      </th>
                      <td>{assign?.start_date}</td>
                      <td>{assign?.due_date
                                        ? 
                                              assign?.due_date
                                          
                                        : 'No due date'}</td>
                      <td>{assign?.title}</td>
                      <td>{assign?.classroom?.class_name}</td>
                      <td>{assign?.user?.username}</td>
                      <td>
                        <Link
                          to={`/viewdetailassign/${assign.id}`}
                          className="btn btn-primary me-3"
                        >
                          <i class="bi bi-info-square me-2"></i>
                          View Details
                        </Link>
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

export default ManageFeedback;
