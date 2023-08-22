import { POSTS_PER_PAGE } from "pages";

interface PaginationProps {
  totalPosts: number;
  paginate: (pageNumber: number) => void;
}

export const Pagination = ({ totalPosts, paginate }: PaginationProps) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / POSTS_PER_PAGE); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="flex space-x-2">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => {
                paginate(number);
              }}
              className="px-4 py-2 text-white bg-blue-500 rounded-md"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
