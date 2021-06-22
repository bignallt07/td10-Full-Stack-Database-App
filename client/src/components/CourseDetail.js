import React, {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown'
import {NavLink, useHistory} from 'react-router-dom';

export default function CourseDetail(props) {

    // Get Authenticated User State
    const {context} = props;
    const authUser = context.authenticatedUser;

    const id = props.match.params.id;
    const [course, setCourse] = useState({});
    const [name, setName] = useState("");
    
    // Create a link for the top menu
    const updateLink = `/courses/${id}/update`;

    let history = useHistory();

    /**
     * useEffect for CourseDetail
     * On update, a new call to the API to fetch course detail information
     */
    useEffect(() => {
        fetch(`http://localhost:5000/api/courses/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setCourse(data)
                    setName(data.User.firstName + " " + data.User.lastName)
                } else {
                    history.push("/notfound");
                }
            })
    }, [id, history]);

    /**
     * 'deleteCourse' - Includes a call to the delete course method and updates page
     */
    function deleteCourse() {
        context.data.deleteCourse(id, context.email, context.pass)
        // Rather than push history, this will ensure the page is updated.
        window.location.href = "/";
    }

    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                {/* Ternary below tests if there is user auth, and if the course owner id matches the id of the authenticated user */}
                    {   
                        authUser && course.userId === authUser.user.id ? 
                            <React.Fragment>
                                <NavLink className="button" to={updateLink}>Update Course</NavLink>
                                <button className="button" onClick={deleteCourse}>Delete Course</button>
                                <NavLink to="/" className="button button-secondary">Return to List</NavLink>
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <NavLink to="/" className="button button-secondary">Return to List</NavLink>
                            </React.Fragment>
                    }
                    
                </div>
            </div>

            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By {name}</p>
                            <ReactMarkdown>{course.description}</ReactMarkdown>
                            
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}
