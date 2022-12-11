const parseApiData = require("./services/apiParser")

try {
    parseApiData()
} catch (e) {
    console.log(e)
}
