import * as bcrypt from 'bcrypt';

export const getBcryptHash = async (
  password: string,
  hashingComplexityLevel = 10,
) => {
  return bcrypt.hash(password, hashingComplexityLevel);
};

export const isSamePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
