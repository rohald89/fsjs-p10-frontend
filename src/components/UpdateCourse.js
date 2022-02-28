import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Form from './Form';

function UpdateCourse(props) {
    const { id } = props.match.params;
    const { context } = props;
    const { id: authId, firstName, lastName, emailAddress, password } = context.authenticatedUser;
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    const [course, setCourse] = useState({
        id: '',
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        user: {
            id: '',
            firstName: '',
            lastName: '',
            emailAddress: ''
        }        
    });

    // make a get request to get the course based on the id parameter
    // if the user is not the owner of the course redirect to forbidden
    // if there's no course for this id parameter redirect to notfound
    useEffect(() => {
        context.data.getCourse(id)
        .then(data => {
            if (!data){
                history.push('/notfound');
            } else if (data.user.id !== authId){
                history.push('/forbidden');
            } else {
                setCourse(data);
            }
        })
        .catch(err => {
            console.log(err);
            history.push('/error');
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // update state upon input field value changes
    const handleChange = e => {
        const { name, value } = e.target;
        setCourse(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    
    // make a put request to save the changes made to the course
    // display errors of there are any and after saving forward the user to the courseDetail page
    const handleUpdate = () => {
        context.data.updateCourse(course, emailAddress, password)
          .then(data => {
              if(data.length) {
                  setErrors(data);
              } else {
                  history.push(`/courses/${id}`)
              }
          })
          .catch(err => console.log(err));
    }

    return (
        <div className="wrap course--update">
            <h2>Update Course</h2>
            <Form
                cancel={() => history.push('/')}
                errors={errors}
                submit={handleUpdate}
                submitButtonText="Update Course"
                elements={() => (
                    <div className="main--flex">
                        <div>
                            <label htmlFor="title">Course Title</label>
                            <input id="title" name="title" type="text" value={course.title || ''} onChange={handleChange} />

                            <label htmlFor="courseAuthor">Course Author</label>
                            <input id="courseAuthor" name="courseAuthor" type="text" defaultValue={`${firstName} ${lastName}` || ''} disabled />

                            <label htmlFor="description">Course Description</label>
                            <textarea id="description" name="description" value={course.description || ''} onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value={course.estimatedTime || ''} onChange={handleChange} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" value={course.materialsNeeded || ''} onChange={handleChange} />
                        </div>
                    </div>
                )} 
            />
        </div>
    )
}

export default UpdateCourse
