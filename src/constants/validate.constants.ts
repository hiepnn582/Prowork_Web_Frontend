const VALIDATION_NUMBER = {
  MAX_ACCOUNT_CHARACTERS: 100,
  MIN_PASSWORD_CHARACTERS: 8,
  MAX_PASSWORD_CHARACTERS: 50,
};

const VALIDATION_REGEX = {
  PASSWORD_RULES: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
};

const validationMessage = {
  required: (field: string) => `${field} is required`,
  maxCharacters: (field: string, numberCharacters: number) =>
    `${field} cannot exceed ${numberCharacters} characters`,
  minCharacters: (field: string, numberCharacters: number) =>
    `${field} must contain at least ${numberCharacters} characters`,
  passwordRules:
    'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number',
};

export { VALIDATION_NUMBER, VALIDATION_REGEX, validationMessage };
