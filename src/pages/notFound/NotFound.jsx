import { Link } from 'react-router-dom'

import bg from '../../assets/images/404_page.png'
import './NotFound.css'

const NotFound = () => {
    return (
        <div
            className="notFound p-5 d-flex flex-column justify-content-center align-items-center"
            style={{
                background: `url(${bg}) no-repeat center bottom/cover`,
                minHeight: '100vh',
            }}
        >
            <h1 className="mb-5">OOps!</h1>
            <h2 className="mt-5">404 - PAGE NOT FOUND</h2>
            <p>
                This page doesn't exist or was removed! We suggest you back to
                home.
            </p>
            <Link to="/" className="my-5">
                GO TO HOMEPAGE
            </Link>
        </div>
    )
}
export default NotFound
