import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from './Form';

function CreateCourse(props) {
    const { context } = props;
    const history = useHistory();
    const { id, firstName, lastName, emailAddress, password } = context.authenticatedUser; 

    const [course, setCourse] = useState({
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        userId: id    
    });
    const [errors, setErrors] = useState([]);

    // update state when any of the input values change
    const handleChange = e => {
        const { name, value } = e.target;
        setCourse(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // create a put request to create the course stored in `course` variable
    const handleCreate = () => {
        context.data.createCourse(course, emailAddress, password)
        .then( data => {
            if(data.length){
                setErrors(data);
            } else {
                history.push('/');
            }
        });
    };

    return (
        <div className="wrap create--course">
            <h2>Create Course</h2>
            <Form
                cancel={() => history.push('/')}
                errors={errors}
                submit={handleCreate}
                submitButtonText="Create Course"
                elements={() => (
                    <div className="main--flex">
                        <div>
                            <label htmlFor="title">Course Title</label>
                            <input id="title" name="title" type="text" onChange={handleChange} />

                            <label htmlFor="courseAuthor">Course Author</label>
                            <input id="courseAuthor" name="courseAuthor" type="text" defaultValue={`${firstName} ${lastName}`} disabled />

                            <label htmlFor="description">Course Description</label>
                            <textarea id="description" name="description" onChange={handleChange} />
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" onChange={handleChange} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" onChange={handleChange} />
                        </div>
                    </div>
                )} 
            />
        </div>
    )
}

export default CreateCourse
