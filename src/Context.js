import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext(); 

export class Provider extends Component {
  constructor() {
    super();
    this.data = new Data();
  }

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null
  }

  render() {
    const {authenticatedUser} = this.state;
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
        handleChange: this.handleChange
      }
    }
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  // sign in user and save it to state and Cookie
  signIn = async (username, password) => {
    const user = await this.data.getUser(username, password);
    if(user !== null){
      user.password = password;
      this.setState(() => {
        return {
          authenticatedUser: user,
        }
      });
      // Set cookie
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
    }
    return user;
  }

  // set the authenticated user state to null and remove the cookie to log the user out
  signOut = () => {
    this.setState(() => { 
      return { 
        authenticatedUser: null 
      }
    });
    Cookies.remove('authenticatedUser');
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

