import React from 'react'

export function CircleLoader() {
    return (
        <div className='fixed inset-0 flex justify-center items-center bg-white bg-opacity-75'>
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
        </div>
    )
}