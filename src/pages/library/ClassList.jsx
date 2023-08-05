import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import ClassService from '../../services/ClassService'

import { ClassIcon, SearchIcon } from '../../components/icons'
import defaultAvatar from '../../assets/images/default_avatar.png'
import '../../assets/styles/LibrarySearchList.css'

const ClassList = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const search = searchParams.get('search')

    const { userInfo } = useSelector((state) => state.user)

    const [classes, setClasses] = useState([])
    const [isEmpty, setIsEmpty] = useState(false)
    const [loading, setLoading] = useState(true)
    const [loadingSearch, setLoadingSearch] = useState(true)
    const [searchInput, setSearchInput] = useState(search)

    const fetchData = async (searchKey) => {
        setLoadingSearch(true)
        setIsEmpty(false)
        const temp = (
            await ClassService.getFilterList(
                '',
                '',
                `${searchKey ? '=' + searchKey : ''}`,
                `=${userInfo.username}`,
                `=${userInfo.username}`,
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                ''
            )
        ).data.list
        setClasses(temp)
        setLoadingSearch(false)
    }

    const checkEmpty = async () => {
        setLoading(true)
        setIsEmpty(false)
        const temp = (
            await ClassService.getFilterList(
                '',
                '',
                '',
                `=${userInfo.username}`,
                `=${userInfo.username}`,
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                ''
            )
        ).data.list
        if (temp.length === 0) {
            setIsEmpty(true)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (userInfo.username) {
            checkEmpty()
        }
    }, [userInfo])

    useEffect(() => {
        if (userInfo?.username) {
            fetchData(search ? search : '')
        }
    }, [userInfo, search])

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <div
                    className="spinner-border mt-5"
                    style={{ width: '3rem', height: '3rem' }}
                    role="status"
                >
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container mt-4 mb-5">
                {isEmpty ? (
                    <div className="setsEmpty d-flex flex-column align-items-center justify-content-center">
                        <img
                            src="https://www.gstatic.com/classroom/empty_states_home.svg"
                            alt="No classes found in your library"
                        />
                        <h3>You haven't created or joined any classes</h3>
                        <p>Your classes will be shown here</p>
                        <div>
                            <button
                                className="btn btn-outline-primary me-3"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#createClassModal"
                            >
                                Create Class
                            </button>
                            <button
                                className="btn btn-primary"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#joinClassModal"
                            >
                                Join Class
                            </button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <form className="sets-search mb-4 d-flex align-items-center">
                            <input
                                className="search-control flex-grow-1"
                                placeholder="Search your classes"
                                type="text"
                                value={searchInput || ''}
                                onChange={(event) =>
                                    setSearchInput(event.target.value)
                                }
                            ></input>
                            <button
                                type="submit"
                                onClick={(event) => {
                                    event.preventDefault()
                                    setSearchParams({
                                        search: searchInput,
                                    })
                                }}
                            >
                                <SearchIcon />
                            </button>
                        </form>
                        {loadingSearch ? (
                            <div className="d-flex justify-content-center">
                                <div
                                    className="spinner-border mt-5"
                                    role="status"
                                >
                                    <span className="visually-hidden">
                                        Loading...
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="sets-list">
                                {classes?.length === 0 && (
                                    <p>No classes matching {search} found</p>
                                )}
                                {classes?.map((classroom) => (
                                    <div
                                        key={classroom.id}
                                        className="set-item mb-3"
                                    >
                                        <Link to={`/class/${classroom.id}`}>
                                            <div className="set-body row mb-2">
                                                <div className="term-count col-1">
                                                    {classroom?.member} member
                                                </div>
                                                <div className="term-count col-1">
                                                    {classroom?.studyset} sets
                                                </div>
                                                <div
                                                    className="set-author col d-flex "
                                                    href="#"
                                                >
                                                    <div className="author-avatar">
                                                        <img
                                                            src={
                                                                classroom?.avatar
                                                                    ? classroom?.avatar
                                                                    : defaultAvatar
                                                            }
                                                            alt="author avatar"
                                                            className="w-100 h-100"
                                                        />
                                                    </div>
                                                    <span className="author-username ms-2">
                                                        {classroom?.author}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="set-title col-2 d-flex align-items-center">
                                                    <ClassIcon className="me-2" />
                                                    {classroom?.class_name}
                                                </div>
                                                <div className="col d-flex align-items-center">
                                                    <p
                                                        className="set-description m-0"
                                                        style={{
                                                            whiteSpace:
                                                                'pre-wrap',
                                                        }}
                                                    >
                                                        {classroom?.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        )
    }
}
export default ClassList
