const api = require("./index")

const getFuelTypes = () => {
    return api.get(`/type`)
}

module.exports = getFuelTypes;