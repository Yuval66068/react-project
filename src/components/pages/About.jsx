import { useState } from "react";
import { Link } from "react-router-dom"


export default function About() {
    const [user, setUser] = useState('Admin')

    if (!user) {
        return <Link to="/" replace={true} />
    }

    return (
        <div className="about">
            <h2 className="about">About</h2>
            <p>This site allows users to create and manage business cards.</p>
            <p>You can create, edit, delete, and mark cards as favorites.</p>
            <p>Business users have additional privileges to create new cards.</p>
        </div>
    )
}