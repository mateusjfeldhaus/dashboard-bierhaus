export const useIsAdmin = (): boolean => {
  return sessionStorage.getItem("bierhaus_auth") === "1";
};
