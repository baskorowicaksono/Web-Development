import React from 'react'

export default function Loading() {
    return (
        <div style = {{height:"100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div className="spinner-border text-success" role="status">

            </div>
            <div className="spinner-border text-danger" role="status">

            </div>
            <div className="spinner-border text-warning" role="status">

            </div>
        </div>
    )
}
