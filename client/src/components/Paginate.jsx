import React, { FC } from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ totalPage = 10, onChange, currentPage }) => {

  return (
    <div className="py-4">
      <ReactPaginate
        className="flex gap-4"
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={onChange}
        pageRangeDisplayed={5}
        pageCount={totalPage}
        previousLabel="< Previous"
        initialPage={parseInt(currentPage || 1) -1}

        pageLinkClassName="pagination-li"
        nextLinkClassName="pagination-li"
        previousLinkClassName="pagination-li"
        activeLinkClassName="pagination-active"
      />
    </div>
  );
};

export default Pagination;