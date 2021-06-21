const setToken = (token) => {
    localStorage.setItem('token', token)
}

const getToken = () => localStorage.getItem('token')

export {  setToken, getToken }