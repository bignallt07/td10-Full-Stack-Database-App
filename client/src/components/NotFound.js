import React from 'react'

export default function NotFound() {
    return (
        <main>
            <div className="wrap">
                <h2>Not Found</h2>
                <p>Sorry! We couldn't find the page you're looking for.</p>
            </div>
        </main>
    )
}

// Fix this later
// possibily add an ternary to check the error. If then role out the correct page (forbidden v not found)