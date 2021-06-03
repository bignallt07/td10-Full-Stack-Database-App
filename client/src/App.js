import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';

// WithContext Components
import withContext from './Context';
const CoursesWithContext = withContext(Courses);

function App() {
  return (
     <Router>
      <div className="App">
          <Header />

          <Switch>
            <Route exact path="/" component={CoursesWithContext} />
            <Route path ="/courses/create" component={CreateCourse} />
            <Route path ="/courses/:id/update" component={UpdateCourse} />
            <Route path="/courses/:id" component={CourseDetail} />
            <Route path="/signin" component={UserSignIn} />
            <Route path="/signup" component={UserSignUp} />

          </Switch>
        </div>
    </Router>
  );
}

export default App;
