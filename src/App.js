import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';
import NotFound from './components/NotFound';

import withContext from './Context';
import PrivateRoute from './PrivateRoute';

// set the components up as Consumers for Context
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CreateCourseWithContext = withContext(CreateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

function App() {
  return (
    <Router>
      <main className="App">
        <HeaderWithContext />
        <Switch>
          <Route exact path='/' component={CoursesWithContext} />
          <PrivateRoute exact path='/courses/create' component={CreateCourseWithContext} />
          <Route exact path='/courses/:id' component={CourseDetailWithContext} />
          <PrivateRoute exact path='/courses/:id/update' component={UpdateCourseWithContext} />
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />
          <Route path="/notfound" component={NotFound} />
          <Route path="/forbidden" component={Forbidden} />
          <Route path="/error" component={UnhandledError} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </Router>

  );
}

export default App;
