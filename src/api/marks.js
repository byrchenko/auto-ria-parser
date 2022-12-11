const api = require("./index")

const getMarks = (categoryId) => {
    return api.get(`/categories/${categoryId}/marks`)
}

module.exports = getMarks;