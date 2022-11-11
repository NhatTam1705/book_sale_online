class APIFeature {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: 'i',
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const queryCopy = { ...this.queryStr };

    //removing from the query string
    const removeFields = ['keyword', 'limit', 'page', 'sortBy', 'orderBy'];
    removeFields.forEach((el) => {
      return delete queryCopy[el];
    });

    // Advance filter for price
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }
  sorting() {
    let sort = {};

    if (this.queryStr.sortBy && this.queryStr.orderBy) {
      sort[this.queryStr.sortBy] = this.queryStr.orderBy === 'desc' ? -1 : 1;
    }

    this.query.sort(sort);
    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}
module.exports = APIFeature;
