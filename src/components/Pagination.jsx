// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line react/prop-types
const Pagination = ({postPerPage, totalPost, paginate}) => {
    const pageNumber = [];
    for(let i = 1; i<=Math.ceil(totalPost / postPerPage);i++){
        pageNumber.push(i)
    }
    return (
        <nav>
            <ul className='pagination mx-auto w-50'>
                {pageNumber.map(number => (
                    <li key={number} className='page-item'>
                        <span onClick={() => paginate(number)} className='page-link' style={{cursor:'pointer'}}>
                            {number}
                        </span>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;