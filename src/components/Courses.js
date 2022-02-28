import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {Link} from 'react-router-dom';

import Pagination from './Pagination';

function Courses(props) {
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(localStorage.getItem('perPage') || 3);
    const { context } = props;
    const history = useHistory();

    // get all courses and store them in the courses and filteredCourses variables
    useEffect(() => {
        setLoading(true);
        context.data.getCourses()
            .then(data => {
                if(data.error) {
                    history.push('/error');
                } else {
                    setCourses(data.courses);
                    setFilteredCourses(data.courses);
                }
            })
            .catch(err => console.log(err));
        setLoading(false);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // add pagination for the courses page
    const lastIndex = currentPage * perPage;
    const firstIndex = lastIndex - perPage;
    const currentCourseRange = filteredCourses.slice(firstIndex, lastIndex);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    const perPageChange = e => {
        // store preferred amount of courses per page in localStorage
        localStorage.setItem('perPage', e.target.value);
        setPerPage(e.target.value);
        setCurrentPage(1);
    };

    // filter courses based on search query
    const filterCourses = (e) => {
        const filtered = courses.filter(course => {
            return course.title.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setCurrentPage(1);
        setFilteredCourses(filtered);
    };

    return (
        <main>
            <input type="text" className="search-input" list="course-titles" onChange={filterCourses} placeholder='Search course ...'/>
            <datalist id="course-titles"> 
            {/* test to see if theres less than 5 filtered courses to generate the options
                otherwise I found the list of names got to long */}
                { filteredCourses && filteredCourses.length < 5 ? 
                    courses.map( (course, i) => (
                        <option key={i}>{course.title}</option>
                    )) : 
                    ''
                }
            </datalist>
            <div className="wrap main--grid">
                { 
                    loading ?
                    <h1>Loading...</h1>
                    : currentCourseRange.map(course => (
                        <Link className="course--module course--link" to={`/courses/${course.id}`} key={course.id} >
                            <h2 className="course--label">Course</h2>
                            <h3 className="course--title">{course.title}</h3>
                            <p className="course--description">{course.description}</p>
                        </Link> 
                ))}
                <Link className="course--module course--add--module" to="/courses/create">
                    <span className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                        New Course
                    </span>
                </Link>
                
            </div>
            <Pagination 
                activePage={currentPage}
                perPage={perPage}
                totalCourses={filteredCourses.length}
                paginate={paginate}
                perPageChange={perPageChange}
            /> 
        </main>
    )
}

export default Courses
