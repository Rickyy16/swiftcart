import React from 'react'
import { Link } from 'react-router'

function Footer() {
    return (
        <footer className="text-center border-t border-gray-200 py-6
space-y-2">
            <Link to="/">
                <h2 className='text-lg uppercase font-bold h-12 mr-3 sm:h-9'><span className='text-purple-700 '>Swift</span>Cart</h2>
            </Link>

            <span className="block text-sm text-center text-gray-500">© 2026 SwiftCart™. All Rights Reserved.
            </span>
        </footer>
    )
}

export default Footer