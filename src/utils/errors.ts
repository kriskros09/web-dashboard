export const getServerError = (serverResponse) => {
  return {
    error: serverResponse?.result?.errors[0] ?? serverResponse.error ?? new Error('Server error'),
  }
}
