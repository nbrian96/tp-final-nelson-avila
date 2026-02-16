// This file is currently used for auth-related local storage if needed,
// but auth state is mainly managed by authSlice which also uses localStorage for tokens.

export const clearLocalStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};
