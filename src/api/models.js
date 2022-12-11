const api = require("./index")

const getModels = (categoryId, markId) => {
    return api.get(`/categories/${categoryId}/marks/${markId}/models`)
}

module.exports = getModels;