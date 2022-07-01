import React, { useEffect } from "react";
import './index.css'


export default function Pagination({page, totalRecords, pageSize, handlePageChange}) {

    useEffect(() => {
        getPaginationContainerWidth()
        window.addEventListener('resize', getPaginationContainerWidth)
      return () => {
        window.removeEventListener('resize', getPaginationContainerWidth)
      }
    }, [])
    

    const pageLength = totalRecords/pageSize
    const pageArray = Array.from({length: pageLength}, (_, index) => index + 1);

    const getPaginationContainerWidth = () => {
        const tableHeaderWidth = document.getElementById('user-activities').clientWidth
        const paginationContainer = document.getElementById('pages_container')
        paginationContainer.style.width = `${(tableHeaderWidth - 20) /16}rem`
    }

  return (
    <div class="pagination_container"  >
      <ul class="pages" id="pages_container" >
        <li class="page__btn">
          <span class="material-icons">{'<'}</span>
        </li>
        {
            pageArray.map((pageNum)=>(
                <li className={`page__numbers ${pageNum === page && 'active'}`} onClick={()=>handlePageChange(pageNum)} >{pageNum}</li>
            ))
        }
        <li class="page__btn">
          <span class="material-icons">{'>'}</span>
        </li>
      </ul>
    </div>
  );
}
