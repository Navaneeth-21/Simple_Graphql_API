import user from "../models/user.js";

const resolvers = {
  Query: {
    user: async (_, { id }) => {
      try {
        return await user.findById(id);
      } catch (error) {
        console.log(error);
      }
    },
    getUser: async (_, { amount }) => {
      try {
        return await user.find().sort({ CreatedAt: -1 }).limit(amount);
      } catch (error) {
        console.log(error);
      }
    },
  },

  Mutation: {
    createUser: async (_, { userInput: { name, description, age } }) => {
      try {
        const createdUser = new user({
          name: name,
          description: description,
          age: age,
          CreatedAt: new Date().toISOString(),
        });
        const result = await createdUser.save();
        return result;
      } catch (error) {
        console.log(error.message);
      }
    },

    deleteUser: async (_, { id }, res) => {
      try {
        const isDeleted = (await user.deleteOne({ _id: id })).deletedCount;
        // 1 if something is deleted(true) , 0 if not deleted(false)
       return isDeleted;
      } catch (error) {
        console.log(error.message);
      }
    },

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
