import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

import { logout as authLogout } from '../../features/auth/authSlice'
import { logout as userLogout } from '../../features/user/userSlice'

import './ProtectedRoute.css'
import { useEffect } from 'react'

const ProtectedRoute = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { userToken } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!userToken) {
            dispatch(userLogout())
            dispatch(authLogout())
            navigate('/')
        }
    }, [userToken])

    // returns child route elements
    return <Outlet />
}
export default ProtectedRoute
