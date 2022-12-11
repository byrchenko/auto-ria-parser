const api = require("./index")

const getBodyStyles = (categoryId) => {
    return api.get(`/categories/${categoryId}/bodystyles`)
}

module.exports = getBodyStyles;