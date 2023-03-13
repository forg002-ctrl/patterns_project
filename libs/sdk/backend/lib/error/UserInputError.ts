export class UserInputError extends Error {
}

export function isUserInputError(x: Error): x is UserInputError {
    return x instanceof UserInputError;
}
