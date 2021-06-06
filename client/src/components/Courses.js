import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';

import CourseLabel from './CourseLabel';

export default function Courses({context}) {

    const [courses, setCourses] = useState([]);

    // Gets all the courses on pageload
    useEffect(() => {
        fetch('http://localhost:5000/api/courses')
            .then(res => res.json())
            .then(data => setCourses(data))
    }, []);         // Empty aaray is to avoid rerender all the time



    return (
        <main>
            <div className="wrap main--grid">
                {courses.map(course => <CourseLabel data={course} key={course.id}/>)}
                <NavLink className="course--module course--add--module" to="courses/create">
                    <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
                </NavLink>
            </div>
        </main>
    )
    
}

/*
1. Bring the useEffect into context later to get ALL data
2. Also, fix it so that localhost isn't in the API
*/