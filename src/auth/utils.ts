import * as bcrypt from 'bcrypt';

export const getBcryptHash = async (password: string) => {
  return bcrypt.hash(password, 13);
};

export const isSamePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
