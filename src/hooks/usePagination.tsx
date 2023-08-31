import { useState, useEffect } from "react";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from "react-icons/md";

interface PaginationProps {
  data: any[];
  dataLength: number;
  postPerPage: number;
}

/**
 * @param
 */
export const usePagination = ({ dataLength, data, postPerPage }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(dataLength / postPerPage);
  const pagesToShow = 3;

  const showPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const pageData = data.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    setCurrentPage(1);
  }, [dataLength]);

  const showPrevPage = () => {
    showPage(currentPage - 1);
  };

  const showNextPage = () => {
    showPage(currentPage + 1);
  };

  const jumpNextPage = () => {
    const rest = (currentPage + pagesToShow) % pagesToShow;
    if (rest === 0) {
      showPage(currentPage + 1);
    } else {
      const jumpPage = currentPage + pagesToShow - rest + 1;
      showPage(jumpPage);
    }
  };

  const jumpPrevPage = () => {
    const rest = (currentPage - pagesToShow) % pagesToShow;
    if (rest === 0) {
      currentPage !== pagesToShow ? showPage(currentPage - (pagesToShow + pagesToShow - 1)) : showPage(1);
    } else {
      const jumpPage = currentPage - pagesToShow - rest + 1;
      showPage(jumpPage);
    }
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
      return "text-gray-700";
    } else {
      return "text-[#e6e6e689]";
    }
  };
  
  const showPageComponent = (
    <ul className="flex items-center gap-3">
      <MdOutlineKeyboardDoubleArrowLeft className="text-[20px] cursor-pointer text-gray-700" onClick={jumpPrevPage} />
      <MdOutlineKeyboardArrowLeft className="text-[20px] cursor-pointer text-gray-700" onClick={showPrevPage} />
      {getPageNumbers().map((number) => (
        <li key={number}>
          <button
            className={`w-[25px] font-bold ${selectedPageColor(number)}`}
            onClick={() => {
              showPage(number);
            }}
          >
            <p className="text-[14px]">{number}</p>
          </button>
        </li>
      ))}
      <MdOutlineKeyboardArrowRight className="text-[20px] cursor-pointer text-gray-700" onClick={showNextPage} />
      <MdOutlineKeyboardDoubleArrowRight className="text-[20px] cursor-pointer text-gray-700" onClick={jumpNextPage} />
    </ul>
  );

  return { showPageComponent, pageData };
};
