import axios from 'axios';

class UserService {
  async getAllUsers() {
    try {
      const response = await axios.get('/users');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  async getUserById(id) {
    try {
      const response = await axios.get(`/users/${id}`);
      return response.data || {};
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      return {};
    }
  }

  async createUser(user) {
    try {
      const response = await axios.post('/users', user);
      return response.data || {};
    } catch (error) {
      console.error('Error creating user:', error);
      return {};
    }
  }

  async updateUser(id, user) {
    try {
      const response = await axios.put(`/users/${id}`, user);
      return response.data || {};
    } catch (error) {
      console.error(`Error updating user with ID ${id}:`, error);
      return {};
    }
  }

  async deleteUser(id) {
    try {
      await axios.delete(`/users/${id}`);
      return {}; // Return an empty object to indicate success
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      return {};
    }
  }
}

export default UserService;