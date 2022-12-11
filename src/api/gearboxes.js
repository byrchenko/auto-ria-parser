const api = require("./index")

const getGearboxes = (categoryId) => {
    return api.get(`/categories/${categoryId}/gearboxes`)
}

module.exports = getGearboxes;