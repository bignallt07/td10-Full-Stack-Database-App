import React from 'react';

export default function Header() {
    return (
        <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><a href="index.html">Courses</a></h1>
                <nav>
                    <ul className="header--signedout">
                        <li><a href="sign-up.html">Sign Up</a></li>
                        <li><a href="sign-in.html">Sign In</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

/**
 * Things to do
 * 1. React-Router-Dom - switch the href to link tags
 * 2. When autherizing the user, enable the switch to in and out
 * 
 */
