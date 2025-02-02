// import React from "react";

// const RecipePagination = ({
//   currentPage,
//   itemsPerPage,
//   totalItems,
//   onPageChange,
//   hasMore,
// }) => {
//   // Calculate the total number of pages
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   // Handle previous and next page actions
//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       onPageChange(currentPage - 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages && hasMore) {
//       onPageChange(currentPage + 1);
//     }
//   };

//   // Generate an array of page numbers for pagination
//   const pageNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div className="pagination">
//       <button onClick={handlePrevPage} disabled={currentPage === 1}>
//         Previous
//       </button>
//       {pageNumbers.map((page) => (
//         <button
//           key={page}
//           onClick={() => onPageChange(page)}
//           className={currentPage === page ? "active" : ""}
//         >
//           {page}
//         </button>
//       ))}
//       <button
//         onClick={handleNextPage}
//         disabled={currentPage === totalPages || !hasMore}
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// export default RecipePagination;
