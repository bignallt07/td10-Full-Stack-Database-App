import React, {useState, useEffect} from 'react';

import CourseLabel from './CourseLabel';

export default function Courses({context}) {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/courses')
            .then(res => res.json())
            .then(data => setCourses(data))
    }, []);         // Empty aaray is to avoid rerender all the time



    return (
        <main>
            <div className="wrap main--grid">
                {courses.map(course => <CourseLabel data={course} key={course.id}/>)}
                <a className="course--module course--add--module" href="create-course.html">
                    <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
                </a>
            </div>
        </main>
    )
    
}
