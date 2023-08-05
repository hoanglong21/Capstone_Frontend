import { Outlet } from 'react-router-dom'

import illustration from '../../../assets/images/background.png'
import './OtherLayout.css'

const OtherLayout = () => {
    return (
        <div
            style={{
                backgroundImage: `url(${illustration})`,
                backgroundSize: 'cover',
                minHeight: '90vh',
                padding: '0 2.5rem',
            }}
        >
            <div className="otherContainer mx-auto">
                <Outlet />
            </div>
        </div>
    )
}
export default OtherLayout
