import config from './config';

export default class Data {
  // method to generate a request to the api
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }
    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);

      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  // get the data of the user currently logged in
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  // create a new user
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.error.message;
      });
    } else {
      throw new Error();
    }
  }

  // get all the courses for the homepage
  async getCourses() {
    const path = `/courses/`;
    const response = await this.api(path, 'GET');
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 500) {
      return response.json();
    }
  }

  // get a single course based on its id for the courseDetail component
  async getCourse(courseId) {
    const path = `/courses/${courseId}`;
    const response = await this.api(path, 'GET');
    if (response.status === 200) {
      return response.json().then(data => data.course);
    } else if (response.status === 404) {
      return null;
    } else if (response.status === 500) {
      return response.json();
    }
  }

  // create a new course
  async createCourse(course, emailAddress, password) {
    const path = `/courses`;
    const response = await this.api(path, 'POST', course, true, { emailAddress, password });
    console.log(response);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.error.message;
      });
    } else {
      throw new Error();
    }
  }

  // make changes to an existing course
  async updateCourse(course, emailAddress, password) {
    const path = `/courses/${course.id}`;
    const response = await this.api(path, 'PUT', course, true, { emailAddress, password });
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.error.message;
      });
    } else if (response.status === 500) {
      this.props.history.push('/error');
    } else {
      throw new Error();
    }
  }

  // delete a course
  async deleteCourse(id, emailAddress, password) {
    const path = `/courses/${id}`;
    const response = await this.api(path, 'DELETE', null, true, { emailAddress, password });
    if (response.status === 204) {
      return;
    }
  }
}
