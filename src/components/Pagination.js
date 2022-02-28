import React from 'react';

// passed the total amount of courses and amount of courses per page to calculate howmany pages are required
// those numbers get stored in an array to then iterate over it to render out the page buttons
function Pagination({ activePage, perPage, totalCourses, paginate, perPageChange }) {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalCourses / perPage); i++){
        pageNumbers.push(i);
    }

    return (
        <nav className="pagination" >
            <ul className="pages-list">
                { pageNumbers.map( number => (
                    <li className="page-list-item" key={number}>
                        <button className={number === activePage ? "page-button active-page" : "page-button"} onClick={() => paginate(number)}>{number}</button>
                    </li>
                ))}
            </ul>  
            <select onChange={perPageChange}>
                <option>3</option>
                <option>6</option>
                <option>9</option>
                <option>12</option>
            </select>
        </nav>
    )
}

export default Pagination
