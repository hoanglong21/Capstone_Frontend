import { NavLink, Outlet } from 'react-router-dom'
import './SettingsLayout.css'

const AccountLayout = () => {
    return (
        <div className="container mt-4 mb-5">
            <h3>Account Settings</h3>
            <div className="card-account__container">
                <div className="row">
                    <div className="card-account__sidebar d-flex flex-column border-end pe-4 col-4 col-lg-3 col-xxl-2">
                        <NavLink
                            className={
                                'card-account__sidebar-link mb-2 ' +
                                +(({ isActive }) => (isActive ? 'active' : ''))
                            }
                            end
                            to="."
                        >
                            My Profile
                        </NavLink>
                        <NavLink
                            className={
                                'card-account__sidebar-link mb-2 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                            to="notification"
                        >
                            Notifications
                        </NavLink>
                        <NavLink
                            to="change-language"
                            className={
                                'card-account__sidebar-link mb-2 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            Language
                        </NavLink>
                        <NavLink
                            to="change-password"
                            className={
                                'card-account__sidebar-link mb-2 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            Change Password
                        </NavLink>
                        <NavLink
                            to="delete-account"
                            className={
                                'card-account__sidebar-link card-account__sidebar-link--warning mt-3 ' +
                                (({ isActive }) => (isActive ? 'active' : ''))
                            }
                        >
                            Delete Account
                        </NavLink>
                    </div>
                    <div className="card-account__body col">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AccountLayout
