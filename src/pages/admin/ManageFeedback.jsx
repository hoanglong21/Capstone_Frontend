import React, {useState, useEffect} from "react";
import SidebarforAdmin from "./SidebarforAdmin";
import HeaderAdmin from "./HeaderAdmin";
import { Link } from "react-router-dom";
import FeedbackService from "../../services/FeedbackService";
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ManageFeedback() {
  const [feedback, setFeedback] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()
  const [error, setError] = useState('')

  const search = searchParams.get('search')

    const { userInfo } = useSelector((state) => state.user)

    const fetchData = async (searchKey) => {
      let temp;
      try{
        temp = (
          await FeedbackService.filterFeedbackList(
            `${searchKey ? '=' + searchKey : ''}`,
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            ''
          )).data.list
      }catch(error){
        if (error.response && error.response.data) {
          setError(error.response.data)
      } else {
          setError(error.message)
      }
      return console.log(error)
      }
      setFeedback(temp)
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
            <h3 className="mt-3 mb-4 text-bold text-black">
              View Feedback
            </h3>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead style={{ backgroundColor: "#000" }}>
                  <tr>
                    <th scope="col">Feedback ID</th>
                    <th scope="col">Create Date</th>
                    <th scope="col">Feedback Title</th>
                    <th scope="col">Creator By</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                {feedback?.length === 0 && (
                                        <p>No data matching {search} found</p>
                                    )}
                {feedback?.map((feedbacks) => (
                  <tr>
                    <th scope="row" key={feedbacks.id}>{feedbacks?.id}</th>
                    <td>{feedbacks?.created_date}</td>
                    <td>{feedbacks?.title}</td>
                    <td>{feedbacks?.user?.username}</td>
                    <td>
                      <Link
                        to={`/viewdetailfb/${feedbacks.id}`}
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
