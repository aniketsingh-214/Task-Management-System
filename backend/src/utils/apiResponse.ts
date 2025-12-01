export const apiResponse = <T>(data: T, message: string = "Success") => {
  return { success: true, message, data };
};
