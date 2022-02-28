import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.PureComponent {
  render() {
    const {context} = this.props;
    const authUser = context.authenticatedUser;
    console.log(authUser);
    return (
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo"><a href="/">Courses</a></h1>
          <nav>
            { authUser ? 
              <ul className="header--signedin">
                <li><span>Welcome, {authUser.firstName}!</span></li>
                <li><Link to="/signout">Sign Out</Link></li>
              </ul>
              :
              <ul className="header--signedout">
                <li><Link className="signup" to="/signup">Sign Up</Link></li>
                <li><Link className="signin" to="/signin">Sign In</Link></li>
              </ul>
            }
          </nav>
        </div>
      </header>
    );
  }
};
