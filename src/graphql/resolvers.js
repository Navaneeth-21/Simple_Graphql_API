import { user, validateCreateUser } from "../models/user.js";

const resolvers = {
  Query: {
    // get user by Id
    user: async (_, { id }) => {
      try {
        return await user.findById(id);
      } catch (error) {
        console.log(error);
      }
    },
    // get all user details 
    getUser: async (_, { amount }) => {
      try {
        return await user.find().sort({ CreatedAt: -1 }).limit(amount);
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    // creating the new user
    createUser: async (_, { userInput }) => {
      try {
        // validating the userInput
        const { error } = validateCreateUser(userInput);
        if (error) {
          throw new Error(`Invalid Input user:${error}`);
        }
        // creating the validated User details
        const createdUser = new user({
          name: userInput.name,
          description: userInput.description,
          age: userInput.age,
          CreatedAt: new Date().toISOString(),
        });

        const result = await createdUser.save();
        return result;
      } catch (error) {
        console.log(error.message);
      }
    },

    // deleting the user by Id
    deleteUser: async (_, { id }) => {
      try {
        const isDeleted = (await user.deleteOne({ _id: id })).deletedCount;
        // 1 if something is deleted(true) , 0 if not deleted(false)
        return isDeleted;
      } catch (error) {
        console.log(error.message);
      }
    },

    // editing or updating the user by Id
    editUser: async (_, { id, editUserInput }) => {
      try {
        const updatedUser = await user.findOneAndUpdate(
          { _id: id },
          {
            name: editUserInput.name,
            description: editUserInput.description,
            age: editUserInput.age,
          },
          { new: true }
        );
        return updatedUser;
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};

export default resolvers;
