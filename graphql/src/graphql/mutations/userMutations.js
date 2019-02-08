import bcrypt from 'bcryptjs';
import { generateTokenForUser } from '../../utils/jwt.utils.js';

export const userMutations = `
  register(input: UserInput): UserLogged,
  login(input: loginInput): UserLogged,
  editUser(input: UserInput): User,
  editPasswordUser(input: PasswordInput): User,
  deleteUser(id: ID!): User
`;

export const userResolvers = {
  register: async (_, { input }, { models }) => {
    const passwordHash = bcrypt.hashSync(input.password, 10);
    const user = new models.User({
      ...input,
      password: passwordHash,
    });
    await user.save();
    const token = generateTokenForUser(user.id);
    return {
      user,
      token,
    };
  },

  login: async (_, { input }, { models }) => {
    const user = await models.User.findOne({ email: input.email });
    if (!user) {
      throw new Error('wrong email');
    }
    if (!bcrypt.compareSync(input.password, user.password)) {
      throw new Error('Wrong password');
    }
    const token = generateTokenForUser(user.id);
    return {
      user,
      token,
    };
  },
  editUser: async (_, { input }, { userId, models }) => {
    // check if user is existed
    const user = await models.User.findById(userId);
    if (!user) {
      throw new Error(`Couldn't find user with id ${user}`);
    }
    // check if password is provided
    let passwordHash;
    if (input.password) {
      if (bcrypt.compareSync(input.password, user.password)) {
        passwordHash = bcrypt.hashSync(input.password, 10);
      } else {
        throw new Error('Wrong password');
      }
    } else {
      passwordHash = user.password;
    }
    return models.User.findOneAndUpdate(
      { _id: userId }, { ...input, password: passwordHash },
      { new: true }
    );
  },

  editPasswordUser: async (_, { input }, { userId, models }) => {
    // check if user is existed
    const user = await models.User.findById(userId);
    if (!user) {
      throw new Error(`Couldn't find user with id ${user}`);
    }
    if (!bcrypt.compareSync(input.oldPassword, user.password)) {
      throw new Error('Wrong password');
    }
    const newPasswordHash = bcrypt.hashSync(input.newPassword, 10);

    return models.User.findOneAndUpdate(
      { _id: userId }, { password: newPasswordHash },
      { new: true }
    );
  },

  deleteUser: async (_, { id }, { models }) => models.User.findOneAndRemove({ _id: id }),
};