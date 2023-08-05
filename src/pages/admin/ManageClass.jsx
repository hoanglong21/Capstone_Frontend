import React,  { useState, useEffect } from "react";
import SidebarforAdmin from "./SidebarforAdmin";
import HeaderAdmin from "./HeaderAdmin";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import ClassService from '../../services/ClassService';
import { useSearchParams } from 'react-router-dom'

function ManageClass() {
  const [searchParams, setSearchParams] = useSearchParams()

    const search = searchParams.get('search')

    const { userInfo } = useSelector((state) => state.user)

    const [classes, setClasses] = useState([])

    const fetchData = async (searchKey) => {
        const temp = (
            await ClassService.getFilterList(
                '=0',
                `${searchKey ? '=' + searchKey : ''}`,
                '',
                '',
                '',
                '',
                '',
                '=10'
            )
        ).data.list
        setClasses(temp)
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
            <h3 className="mt-3 mb-4 text-bold text-black">View Class</h3>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead style={{ backgroundColor: "#000" }}>
                  <tr>
                    <th scope="col">Class ID</th>
                    <th scope="col">ClassName</th>
                    <th scope="col">Tutor</th>
                    <th scope="col">Create Date</th>
                    <th scope="col">Active</th>
                  </tr>
                </thead>
                <tbody>
                {classes?.length === 0 && (
                                        <p>No data matching {search} found</p>
                                    )}
                {classes?.map((classroom) => (
                  <tr key={classroom.id}>
                    <th scope="row">{classroom?.id}</th>
                    <td>
                      <p className="text-info mb-0">{classroom?.class_name}</p>
                    </td>
                    <td>{classroom?.author}</td>
                    <td>{classroom?.created_date}</td>
                    <td>
                      <Link
                        className="btn btn-primary me-3"
                        to={`/viewdetailclass/${classroom.id}`}
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

export default ManageClass;
