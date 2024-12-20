import IAlert from './IAlert'
import IDevice from './IDevice'
import IHouse from './IHouse'
import IRegistration from './IRegistration'

export default interface IUser {
  name: string
  password: string
  email: string
  id: string
  devices: IDevice[]
  registrations: IRegistration[]
  houses?: IHouse[]
  alerts?: IAlert[]
}
