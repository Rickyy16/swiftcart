import React from 'react'
import { Link } from 'react-router'

function Footer() {
    return (
        <div className="text-center border-bs-1 py-3">
            <Link to="/">
                <h2 className='text-lg uppercase font-bold h-12 mr-3 sm:h-9'><span className='text-purple-700 '>Swift</span>Cart</h2>
            </Link>

            <span className="block text-sm text-center text-gray-500">© 2026 SwiftCart™. All Rights Reserved.
            </span>
        </div>
    )
}

export default Footer