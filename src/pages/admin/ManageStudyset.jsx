import React, { useState, useEffect } from 'react'
import SidebarforAdmin from './SidebarforAdmin'
import HeaderAdmin from './HeaderAdmin'
import { Link } from 'react-router-dom'
import StudySetService from '../../services/StudySetService'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ManageFeedback() {
    const [searchParams, setSearchParams] = useSearchParams()

    const search = searchParams.get('search')

    const { userInfo } = useSelector((state) => state.user)

    const [sets, setSets] = useState([])

    const fetchData = async (searchKey) => {
        const temp = (
            await StudySetService.getFilterList(
                '=0',
                '',
                '=0',
                `${searchKey ? '=' + searchKey : ''}`,
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
                '=10'
            )
        ).data.list
        setSets(temp)
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
                            View Studyset
                        </h3>
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead style={{ backgroundColor: '#000' }}>
                                    <tr>
                                        <th scope="col">Studyset ID</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Created Date</th>
                                        <th scope="col">Creator By</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sets?.length === 0 && (
                                        <p>No data matching {search} found</p>
                                    )}
                                    {sets?.map((set) => (
                                        <tr>
                                            <th scope="row" key={set?.id}>
                                                {set?.id}
                                            </th>
                                            <td>{set?.title}</td>
                                            <td>{set?.created_date}</td>
                                            <td>{set?.author}</td>
                                            <td>
                                                <Link
                                                    to={`/viewdetailset/${set.id}`}
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
    )
}

export default ManageFeedback
