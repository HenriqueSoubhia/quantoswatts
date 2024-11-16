import useLocalStorage from './useLocalStorage'

const useAuth = () => {
  const { saveLocalStorage, getLocalStorage } = useLocalStorage()

  const getAuthUser = () => {
    const user = getLocalStorage('user')

    if (user != null) {
      return true
    } else {
      return false
    }
  }

  const setAuthUser = (user: { name: string; id: string }) => {
    saveLocalStorage('user', user)
  }

  return { getAuthUser,setAuthUser }
}

export default useAuth
