import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { POSTS_PER_PAGE } from "pages";

interface PaginationProps {
  totalPosts: number;
  paginate: (pageNumber: number) => void;
}

export const PostPagination = ({ totalPosts, paginate }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const pagesToShow = 3;

  const showPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      paginate(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  useEffect(() => {
    setCurrentPage(1);
  }, [totalPosts]);
  const showPrevPage = () => {
    showPage(currentPage - 1);
  };
  const showNextPage = () => {
    showPage(currentPage + 1);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const currentPageGroup = Math.ceil(currentPage / pagesToShow);
    const startPage = (currentPageGroup - 1) * pagesToShow + 1;

    for (let i = startPage; i <= Math.min(startPage + pagesToShow - 1, totalPages); i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };
  const selectedPageColor = (number: number) => {
    if (number === currentPage) {
      return "text-[#000000]";
    } else {
      return "text-[#e6e6e6]";
    }
  };
  return (
    <ul className="relative flex gap-3">
      <IoIosArrowBack className="text-[20px] cursor-pointer" onClick={showPrevPage} />

      {getPageNumbers().map((number) => (
        <li key={number}>
          <button
            onClick={() => {
              showPage(number);
            }}
            className={`w-[25px] font-bold ${selectedPageColor(number)}`}
          >
            {number}
          </button>
        </li>
      ))}
      <IoIosArrowForward className="text-[20px] cursor-pointer" onClick={showNextPage} />
    </ul>
  );
};
