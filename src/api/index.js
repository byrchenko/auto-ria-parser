require("dotenv").config();
const axios = require("axios");

const api = axios.create({
    baseURL: "https://developers.ria.com/auto",
    params: {
        ["api_key"]: process.env.API_KEY
    }
})

module.exports = api;