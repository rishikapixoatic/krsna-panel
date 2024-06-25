const validations = {
    validateEmail: (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
  
    validatePassword: (password) => {
      return password.length >= 8;
    },

    validateNotEmpty: (value) => {
      return value.trim() !== '';
    },

    validateURL: (url) => {
      try {
        new URL(url);
        return true;
      } catch (error) {
        return false;
      }
    },

  };
  
export default validations;
  