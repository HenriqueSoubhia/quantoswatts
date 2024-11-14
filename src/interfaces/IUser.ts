import IDevice from "./IDevice";
import { IRegistration } from "./IRegistration";

export default interface IUser {
  name: string;
  password: string;
  email: string;
  id: string;
  devices: IDevice[];
  registrations: IRegistration[];
}
