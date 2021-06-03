import React from 'react'

export default function UpdateCourse() {
    return (
        <main>
            <div class="wrap">
                <h2>Update Course</h2>
                <form>
                    <div class="main--flex">
                        <div>
                            <label for="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" value="TITLE GOES HERE" />

                            <p>By NAME GOES HERE</p>

                            <label for="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription">DESCRIPTION GOES HERE</textarea>
                        </div>
                        <div>
                            <label for="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value="TIME GOES HERE" />

                            <label for="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded">MATERIALS NEEDED GOES HERE</textarea>
                        </div>
                    </div>
                    <button class="button" type="submit">Update Course</button><button class="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
                </form>
            </div>
        </main>
    )
}

// Jobs to do
// Fetch data and add in like on course detail
// On submit, update the course data
// Add cancel button
// Add validation errors to title and description
// Authenticated user only