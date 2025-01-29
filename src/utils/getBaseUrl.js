function getBaseUrl() {
    const baseUrl = 'http://localhost:' + process.env.REACT_APP_APIS_PORT;
    return baseUrl;
}

export default getBaseUrl;