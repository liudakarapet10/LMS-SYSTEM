export const validateEmail = (email: string): string | undefined => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.length || !validRegex.test(email)) {
      return "Будь ласка введіть валідний емейл"
    }
  }
  
  export const validatePassword = (password: string): string | undefined => {
    if (password.length < 5) {
      return "Будь ласка введіть пароль що має не менше 5 символів"
    }
  }
  
  export const validateName = (name: string): string | undefined => {
    if (!name.length) return `Будь ласка введіть значення`
  }
  