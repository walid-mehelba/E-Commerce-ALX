import userModel from "../models/userModel";
import bcrypt from "bcrypt";

interface RegisterParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface loginParams {
  email: string;
  password: string;
}

// User Registration Function
export const register = async ({
  firstName,
  lastName,
  email,
  password,
}: RegisterParams) => {
  const findUser = await userModel.findOne({ email });

  if (findUser) {
    return { data: "User already exist", statusCode: 400 };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new userModel({
    email: email,
    password: hashedPassword,
    firstName: firstName,
    lastName: lastName,
  });
  await newUser.save();

  return { data: newUser, statusCode: 200 };
};

// User Login Function
export const login = async ({ email, password }: loginParams) => {
  const findUser = await userModel.findOne({ email });

  if (!findUser) {
    return { data: "User not found", statusCode: 400 };
  }

  const passwordMatch = await bcrypt.compare(password, findUser.password);

  if (passwordMatch) {
    return { data: findUser, statusCode: 200 };
  }

  return { data: "Incorrect email or password", statusCode: 400 };
};
