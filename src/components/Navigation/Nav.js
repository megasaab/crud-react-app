import React from "react";
import {Link} from 'react-router-dom'

function Navigation() {

    const navStyle = {
        color: 'white'
    };

    return (
        <div>
            <nav>
                <h3>Logo</h3>
                <ul className="nav-links">
                    <Link style={navStyle} to='/main'>
                        <li>Main</li>
                    </Link>
                    <Link style={navStyle} to='/developers'>
                        <li>Developers</li>
                    </Link>
                </ul>
            </nav>
        </div>
    );
}

export default Navigation;
