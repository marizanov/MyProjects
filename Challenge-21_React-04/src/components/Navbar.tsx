
import { Link } from 'react-router-dom'



export default function Navbar() {
    return (
        <div className='row'>
            <div className='d-flex justify-content-between pt-4 pb-4'>
                <div>
                    <Link className='text-uppercase text-decoration-none text-dark fw-bold fs-5' to="/">Restaurant</Link>
                </div>
                <div>
                    <Link to="/favorits">
                        <i className="fa-solid fa-heart fa-2x"></i>
                    </Link>
                </div>
            </div>

        </div>
        
    )
}