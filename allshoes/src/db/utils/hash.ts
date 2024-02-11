import bcrypt from "bcryptjs";

export const hashPass = (password: string) => {
  return bcrypt.hashSync(password);
};
export const comparePass = (password: string, hashedPassword: string) => {
  return bcrypt.compareSync(password, hashedPassword);
};
