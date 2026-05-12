import User from "../models/user.model.js";

// Métodos DB
class UserRepository {
    async getById(id) {
        return await User.findById(id);
    }

    async create(name, email, password) {
        return await User.create({ name, email, password });
    }

    async getByEmail(email) {
        return await User.findOne({ email, active: true });
    }

    async deleteById(id) {
        return await User.findByIdAndDelete(id);
    }

    async updateById(id, update_data) {
        return await User.findByIdAndUpdate(id, update_data, { new: true });
    }
}

export default new UserRepository();