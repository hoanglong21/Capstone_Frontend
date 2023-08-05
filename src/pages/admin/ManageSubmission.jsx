import React, {useState, useEffect} from "react";
import SidebarforAdmin from "./SidebarforAdmin";
import HeaderAdmin from "./HeaderAdmin";
import { Link } from "react-router-dom";
import SubmissionService from "../../services/SubmissionService";
import { useSearchParams } from 'react-router-dom'

function ManageSubmission() {
  const [submission, setSubmission] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [error, setError] = useState('')

  const search = searchParams.get('search')
    const fetchData = async (searchKey) => {
      let temp;
      try{
        temp = (
            await SubmissionService.getFilterList(
                '',
                `${searchKey ? '=' + searchKey : ''}`,
                '',
                '',
                '',
                '=10',
            )
        ).data.list
      }catch(error){
        if (error.response && error.response.data) {
          setError(error.response.data)
      } else {
          setError(error.message)
      }
      return console.log(error)
      }
      setSubmission(temp)
    }
    console.log(submission)

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
            <h3 className="mt-3 mb-4 text-bold text-black">
              View Submission
            </h3>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead style={{ backgroundColor: "#000" }}>
                  <tr>
                    <th scope="col">Submission ID</th>
                    <th scope="col">Created Date</th>
                    <th scope="col">Assignment Name</th>
                    <th scope="col">Create By</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                {submission?.length === 0 && (
                                        <p>No data matching {search} found</p>
                                    )}
                {submission?.map((submissions) => (
                  <tr>
                    <th scope="row" key={submissions.id}>{submissions?.id}</th>
                    <td>{submissions?.created_date}</td>
                    <td>{submissions?.assignment?.title}</td>
                    <td>{submissions?.user?.username}</td>
                    <td>
                      <Link
                        to={`/viewdetailsubmission/${submissions.id}`}
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

export default ManageSubmission;
