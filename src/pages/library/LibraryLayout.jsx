import { NavLink, Outlet, useSearchParams } from 'react-router-dom'

const LibraryLayout = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const search = searchParams.get('search')

    return (
        <div className="flex-grow-1">
            <div className="border-bottom bg-white p-2 pb-0">
                <ul className="nav d-flex align-items-center flex-grow-1 mx-5 fw-semibold">
                    <li>
                        <NavLink
                            to="achievements"
                            className={
                                'nav-link sub-nav-link px-3 me-3 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            <span className="align-middle">Achievements</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={{
                                pathname: 'sets',
                                search: `?${searchParams.toString()}`,
                            }}
                            className={
                                'nav-link sub-nav-link px-3 me-3 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            <span className="align-middle">Study sets</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={{
                                pathname: 'classes',
                                search: `?${searchParams.toString()}`,
                            }}
                            className={
                                'nav-link px-3 sub-nav-link me-3 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            <span className="align-middle">Classes</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={`statistics`}
                            className={
                                'nav-link sub-nav-link px-3 me-3 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            <span className="align-middle">Statistics</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="mx-5 p-2">
                <Outlet />
            </div>
        </div>
    )
}
export default LibraryLayout
