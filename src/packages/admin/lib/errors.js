export function isBackendDown(error) {
  if (!error) return false;
  if (error instanceof TypeError) return true; // fetch network failure
  if (error.name === "TimeoutError" || error.name === "AbortError") return true;
  if (typeof error.status === "number" && error.status >= 500) return true;
  return false;
}
