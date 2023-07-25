import { UserDTO } from "../../models/user.model";

const userMap = async (data: any[]): Promise<UserDTO[]> => {
  const userDtos: UserDTO[] = data.map((e) => {
    return { username: e.username };
  });

  return userDtos;
};

export default userMap;
