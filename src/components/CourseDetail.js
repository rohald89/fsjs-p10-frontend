import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import withContext from '../Context';
import ActionBar from './ActionsBar';

const ActionBarWithContext = withContext(ActionBar);

function CourseDetail(props) {
    const { id } = props.match.params;
    const { context } = props;
    const history = useHistory();
    const [ course, setCourse ] = useState({
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

    // fetch the course based on the id parameter and save it to state. when no course with that id is found redirect to notfound component
    useEffect( () => {
        context.data.getCourse(id)
        .then(data => {
            if(data === null) {
                history.push('/notfound');
            } else if(data.error) {
                history.push('/error');
            } else {
                setCourse(data);
            }
        })
        .catch(err => {
            console.log(err);
            history.push('/error');
        });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <>

                <ActionBarWithContext course={course} />
            
            <div className="wrap course--detail">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By {course.user.firstName} {course.user.lastName}</p>

                            <ReactMarkdown>{course.description}</ReactMarkdown>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ReactMarkdown>{course.materialsNeeded}</ReactMarkdown>
                        </div>
                    </div>
                </form>
            </div>
            </>
    )
}

export default CourseDetail
