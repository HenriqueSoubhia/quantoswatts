import IUser from '@/interfaces/IUser'
import useLocalStorage from './useLocalStorage'
import IDevice from '@/interfaces/IDevice'

const useMenageDevices = () => {
  const { getLocalStorage, saveLocalStorage } = useLocalStorage()

  const addDevice = (userId: string, newDevice: IDevice) => {
    const users: IUser[] = getLocalStorage('users')

    const currentUser = users.find((user: { id: string }) => user.id === userId)

    if (currentUser) {
      currentUser.devices.push(newDevice)
      const updatedUsers = users.map((user: { id: string }) =>
        user.id === userId ? currentUser : user
      )
      saveLocalStorage('users', updatedUsers)
    }
  }

  const editDevice = (userId: string, updatedDevice: IDevice) => {
    const users: IUser[] = getLocalStorage('users')

    const currentUser = users.find((user: { id: string }) => user.id === userId)

    if (currentUser) {
      currentUser.devices = currentUser.devices.map((device: IDevice) =>
        device.id === updatedDevice.id ? updatedDevice : device
      )

      const updatedUsers = users.map((user: IUser) =>
        user.id === userId ? currentUser : user
      )

      saveLocalStorage('users', updatedUsers)
    }
  }

  const deleteDevice = (userId: string, deviceId: string) => {
    const users: IUser[] = getLocalStorage('users')

    const currentUser = users.find((user: { id: string }) => user.id === userId)

    if (currentUser) {
      currentUser.devices = currentUser.devices.filter(
        (device: { id: string }) => device.id !== deviceId
      )

      const updatedUsers = users.map((user: { id: string }) =>
        user.id === userId ? currentUser : user
      )

      saveLocalStorage('users', updatedUsers)
    }
  }

  return { addDevice, editDevice, deleteDevice }
}

export default useMenageDevices
