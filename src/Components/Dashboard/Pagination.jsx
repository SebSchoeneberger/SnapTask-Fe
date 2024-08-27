const Pagination = ({ page, setPage, perPage, setPerPage, totalPages, totalResults }) => {
  // Handle per page change
  function handlePerPageChange(e) {
    setPage(1);
    setPerPage(e.target.value);
  }

  return (
    <div className="flex justify-between my-4">
      <div className="flex items-center gap-2">
        <select onChange={handlePerPageChange} value={perPage} className="text-center py-1 font-semibold gradientselect w-20 bg-base-200">
          <option className="bg-base-200 " value={"10"}>
            {"1-10"}
          </option>
          <option className="bg-base-200 " value={"25"}>
            {"1-25"}
          </option>
          <option className="bg-base-200 " value={"50"}>
            {"1-50"}
          </option>
        </select>
        <p className="text-sm">of</p>
        <p className="text-sm">{totalResults}</p>
      </div>

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
    </div>
  );
};

export default Pagination;
