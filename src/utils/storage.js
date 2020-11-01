function getStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
function setStorage(key, val) {
    localStorage.setItem(key,JSON.stringify(val));
}
function removeStorage(key) {
    localStorage.removeItem(key);
}
function clearStorage() {
    localStorage.clear();
}
export {
    getStorage,
    setStorage,
    removeStorage,
    clearStorage
}