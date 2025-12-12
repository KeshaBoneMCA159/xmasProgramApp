const paginationResults = (obj) => {
    let results = {};

    const query = obj.query ? obj.query : {};

    // Default to page 1, limit 12 items per page if not specified in query
    let page = parseInt(query.page) || 1;
    let limit = parseInt(query.limit) || 12;

    const startIdx = (page - 1) * limit;
    const endIdx = page * limit;

    results.page = page;
    results.limit = limit;
    results.startIdx = startIdx;
    results.endIdx = endIdx;

    return results;
};

const buildProgramArr = (allProgramsArr, pagedResultsArr, start, end, page) => {

    let results = {};

    // Loop through the main array and push items for the current page
    for (let i = start; i < end; i++) {
        if (allProgramsArr[i] !== undefined) {
            pagedResultsArr = [...pagedResultsArr, allProgramsArr[i]];
        }
    }

    // Determine the previous page number (null if on page 1)
    const prev = page > 1 ? page - 1 : null;
    
    // Determine the next page number (null if the end of the data is reached)
    const next = end >= allProgramsArr.length ? null : page + 1;

    results.programs = pagedResultsArr; // Renamed from results.arr to results.programs
    results.prev = prev;
    results.next = next;

    return results;
};

module.exports = {
    paginationResults,
    buildProgramArr
};
