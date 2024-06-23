import { useState } from "react";
import { Link } from "react-router-dom"


export default function About () {
    const [user, setUser] = useState('Admin')

    if (!user) {
        return <Link to="/" replace={true} />
    }

    return (
        <div className="about">
            <h2>About us</h2>
            <p>"Learn about our journey from humble beginnings to
                 becoming a leading provider in our industry. Discover our commitment 
                 to innovation, quality, and customer satisfaction."
            </p>
             <p>"Our mission is to empower individuals and businesses with
                     cutting-edge solutions that drive growth and efficiency. 
                     Explore how we strive to make a positive impact in every community we serve."
            </p>
             <p>"At [Company Name], integrity, collaboration,
                 and excellence are at the heart of everything we do. 
                 Dive into our core values and how they shape our operations and relationships."
            </p>
             <p>"Meet the passionate individuals who form the backbone of our organization.
                 Learn about their diverse backgrounds,
                  expertise, and shared dedication to achieving our collective goals."
            </p>
             <p>"Discover our commitment to giving back to society through sustainable 
                practices and community initiatives. Explore how we support local causes 
                and foster meaningful connections."
            </p>

        </div>
        
    )

}