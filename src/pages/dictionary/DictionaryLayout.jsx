import { NavLink, Outlet, useSearchParams } from 'react-router-dom'

import './dictionary.css'
import { useState } from 'react'

function DictionaryLayout() {
    const [searchParams, setSearchParams] = useSearchParams()
    const search = searchParams.get('search')

    const [searchKey, setSearchKey] = useState(search)

    return (
        <div className="container">
            {/* Search */}
            <div className="mx-auto py-8">
                <h4 className="text-3xl font-bold text-center text-black mt-3">
                    Nihongo Level Up Dictionary
                </h4>
                <p className="text-center mt-1 mb-10 text-slate-300 text-lg">
                    Find definition for word
                </p>

                <div className="justify-center mt-4">
                    <div className="text-center form-inline">
                        <form
                            className="form-inline w-50"
                            style={{ display: 'inline-flex' }}
                        >
                            <input
                                className="form-control mr-sm-2"
                                type="search"
                                placeholder="日本, Japanese, Nhật Bản"
                                value={searchKey || ''}
                                onChange={(event) =>
                                    setSearchKey(event.target.value)
                                }
                            />
                            <button
                                className="btn btn-primary my-2 my-sm-0"
                                style={{ marginLeft: '1rem' }}
                                onClick={(event) => {
                                    event.preventDefault()
                                    setSearchParams({
                                        search: searchKey,
                                    })
                                }}
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {/* Header */}
            <div className="border-bottom bg-white p-2 pb-0">
                <ul className="nav d-flex align-items-center flex-grow-1 mx-5 fw-semibold">
                    <li>
                        <NavLink
                            to={{
                                pathname: 'vocab',
                                search: `?${searchParams.toString()}`,
                            }}
                            className={
                                'nav-link px-3 sub-nav-link me-3 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            <span className="align-middle">Vocabulary</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={{
                                pathname: 'kanji',
                                search: `?${searchParams.toString()}`,
                            }}
                            className={
                                'nav-link sub-nav-link px-3 me-3 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            <span className="align-middle">Kanji</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={{
                                pathname: 'grammar',
                                search: `?${searchParams.toString()}`,
                            }}
                            className={
                                'nav-link px-3 sub-nav-link me-3 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            <span className="align-middle">Grammar</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
            {/* Content */}
            <div className="">
                <Outlet />
            </div>
        </div>
    )
}

export default DictionaryLayout
