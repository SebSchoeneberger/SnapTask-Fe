const Pagination = ({ page, setPage, totalPages }) => {
  return (
    <div className="join">
      {page > 1 && (
        <button onClick={() => setPage(page - 1)} className="join-item btn btn-sm">
          «
        </button>
      )}

      {page > 1 && (
        <button onClick={() => setPage(1)} className="join-item btn btn-sm">
          1
        </button>
      )}

      {page - 1 > 2 && <button className="join-item btn btn-sm btn-disabled">...</button>}

      {page > 2 && (
        <button onClick={() => setPage(page - 1)} className="join-item btn  btn-sm">
          {page - 1}
        </button>
      )}

      {totalPages > 1 && <button className="join-item btn btn-primary btn-sm hover:cursor-default">{page}</button>}

      {page + 1 < totalPages && (
        <button onClick={() => setPage(page + 1)} className="join-item btn  btn-sm ">
          {page + 1}
        </button>
      )}

      {totalPages - page > 2 && <button className="join-item btn btn-sm btn-disabled">...</button>}

      {page < totalPages && (
        <button onClick={() => setPage(totalPages)} className="join-item btn btn-sm">
          {totalPages}
        </button>
      )}

      {page < totalPages && (
        <button onClick={() => setPage(page + 1)} className="join-item btn btn-sm">
          »
        </button>
      )}
    </div>
  );
};

export default Pagination;
