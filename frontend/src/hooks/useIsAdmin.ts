import { getToken } from "../api/client";

export const useIsAdmin = (): boolean => {
  const token = getToken();
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.admin === true && payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};
