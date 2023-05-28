interface AuthData {
  email: string;
  password: string;
  fullName?: string;
}

export const validateEmail = (email: string, setFormErrors: React.Dispatch<React.SetStateAction<AuthData>>) => {
  const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!email)
    setFormErrors((oldData: AuthData) => ({ ...oldData, email: 'Email is required' }))
  else if (!emailRegex.test(email))
    setFormErrors((oldData: AuthData) => ({ ...oldData, email: 'Email not valid' }));
  else
    setFormErrors((oldData: AuthData) => ({ ...oldData, email: '' }));
};

export const validatePassword = (password: string, setFormErrors: React.Dispatch<React.SetStateAction<AuthData>>) => {
  if (!password)
    setFormErrors((oldData: AuthData) => ({ ...oldData, password: 'Password is required' }));
  else if (!/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).*$/.test(password))
    setFormErrors((oldData: AuthData) => ({ ...oldData, password: 'Password must be at least 8 characters long and contain at least one digit, one lowercase letter, one uppercase letter, and one special character'}))
  else 
    setFormErrors((oldData: AuthData) => ({ ...oldData, password: '' }));
}

export const validateName = (name: string, setFormErrors: React.Dispatch<React.SetStateAction<AuthData>>) => {
  if (!name)
    setFormErrors((oldData: AuthData) => ({ ...oldData, fullName: 'Full Name is required' }));
  else 
    setFormErrors((oldData: AuthData) => ({ ...oldData, fullName: '' }));
}