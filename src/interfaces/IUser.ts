import IDevice from "./IDevice";

export default interface IUser {
  name: string;
  password: string;
  email: string;
  id: string;
  devices: IDevice[];
}
