// Pagination.jsx
const Pagination = ({ currentPage, totalPages, onPageChange, baseUrl }) => {
  // Generate page links
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pager_navigation container-1-col margin-top-sm margin-bottom-md">
      <ul>
        {/* Previous Button */}

        {currentPage > 1 ? (
          <>
            <li className="type-sansserif type-bold type-sz-caption">
              <a
                href={`${baseUrl}/page/${currentPage - 1}`}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(currentPage - 1);
                  window.scrollTo(0, 0); // Scroll to the top of the page
                }}
              >
                &lt;
              </a>
            </li>
          </>
        ) : (
          ""
        )}

        {/* Page Numbers */}
        {pageNumbers.map((page) => {
          if (
            page === 1 || // Always show first page
            page === totalPages || // Always show last page
            Math.abs(page - currentPage) <= 2 // Show 2 pages before/after current
          ) {
            return (
              <li key={page} className={page === currentPage ? "active" : ""}>
                <a
                  href={`${baseUrl}/page/${page}`}
                  className="type-sansserif type-bold type-sz-caption"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(page);
                    window.scrollTo(0, 0); // Scroll to the top of the page
                  }}
                >
                  {page}
                </a>
              </li>
            );
          }
          // Show ellipsis for skipped ranges
          if (
            Math.abs(page - currentPage) === 3 ||
            (page === 2 && currentPage > 4) ||
            (page === totalPages - 1 && currentPage < totalPages - 3)
          ) {
            return <li key={`ellipsis-${page}`}>…</li>;
          }
          return null;
        })}

        {/* Next Button */}
        <li className="type-sansserif type-bold type-sz-caption">
          {currentPage < totalPages ? (
            <a
              href={`${baseUrl}/page/${currentPage + 1}`}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(currentPage + 1);
                window.scrollTo(0, 0); // Scroll to the top of the page
              }}
            >
              &gt;
            </a>
          ) : (
            ""
          )}
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
