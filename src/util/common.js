const setToken = (token) => {
    localStorage.setItem('token', token)
}

const getToken = () => localStorage.getItem('token')

const removeToken = () => localStorage.removeItem('token')

/**
 * 是否包含字符串
 *
 * @param sourceStr
 * @param targetStr
 * @author baicaixiaozhan
 * @returns {boolean}
 */
const containsStr = (sourceStr, targetStr) => sourceStr.indexOf(targetStr) > -1

export {  setToken, getToken, removeToken, containsStr }