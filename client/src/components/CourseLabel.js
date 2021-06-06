import React from 'react';
import {NavLink} from 'react-router-dom';

export default function CourseLabel(props) {

    const idLink = `courses/${props.data.id}`;

    return (
        <NavLink to={idLink} className="course--module course--link">
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{props.data.title}</h3>
        </NavLink>
    )
}

/*
This component render each of the menu items. So each time you add a new one, it will be there

*/
