export const useLocalStorage = () => {
  const setStorage = (key: string, value: any) => {
    localStorage.setItem(key, value)
  }

  const getStorage = (key: string) => {
    return localStorage.getItem(key)
  }

  const removeStorage = (key: string) => {
    return localStorage.removeItem(key)
  }

  const clearStorage = () => {
    return localStorage.clear()
  }

  return {setStorage, getStorage, removeStorage, clearStorage}
}
