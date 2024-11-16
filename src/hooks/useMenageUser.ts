import IHouse from '@/interfaces/IHouse'
import useLocalStorage from './useLocalStorage'
import IUser from '@/interfaces/IUser'
import { useNavigate } from 'react-router-dom'

const useMenageUser = () => {
  const { saveLocalStorage, getLocalStorage } = useLocalStorage()

  const navigate = useNavigate()

  const getUsers = (): IUser[] => {
    const users: IUser[] = getLocalStorage('users') || []
    return users
  }

  const getUserById = (id: string) => {
    const users = getUsers()
    const user = users.find(item => item.id === id)
    return user
  }

  const getCurrentUserData = () => {
    const user = getLocalStorage('user')
    const currentUser = getUsers().find(item => item.id === user.id)

    return currentUser!
  }

  const logoff = () => {
    saveLocalStorage('user', null)
    navigate('/')
  }

  const setUser = (user: IUser) => {
    saveLocalStorage('user', user)
  }

  const addUser = (newUser: IUser) => {
    const users: IUser[] = getLocalStorage('users')

    if (users) {
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))
    } else {
      localStorage.setItem('users', JSON.stringify([newUser]))
    }
  }

  const updateUser = (user: IUser) => {
    const users: IUser[] = getLocalStorage('users')

    if (users) {
      const index = users.findIndex(item => item.id === user.id)
      users[index] = user

      localStorage.setItem('users', JSON.stringify(users))
    }
  }

  const createHouse = (newHouse: IHouse) => {
    const user = getCurrentUserData()

    if (!user.houses) {
      user.houses = []
    }

    updateUser({ ...user, houses: [...user.houses, newHouse] })
  }

  return {
    addUser,
    getCurrentUserData,
    setUser,
    getUsers,
    logoff,
    createHouse,
    getUserById
  }
}

export default useMenageUser
