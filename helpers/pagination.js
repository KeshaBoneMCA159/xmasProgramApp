const paginationResults = (obj) => {
    let results = {}

    const query = obj.query ? obj.query : {}

    // Default to page 1, limit 12 items per page if not specified in query
    let page = parseInt(query.page) || 1
    let limit = parseInt(query.limit) || 12

    const startIdx = (page - 1) * limit
    const endIdx = page * limit

    results.page = page
    results.limit = limit
    results.startIdx = startIdx
    results.endIdx = endIdx

    return results
}

const buildProgramArr = (allProgramsArr, start, end, page) => {
  const programs = allProgramsArr.slice(start, end)

  const prev = page > 1 ? page - 1 : null
  const next = end >= allProgramsArr.length ? null : page + 1

  return { programs, prev, next }
}

module.exports = {
    paginationResults,
    buildProgramArr
}
