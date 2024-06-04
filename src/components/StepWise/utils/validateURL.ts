export const isValidUrl = (urlString: string) => {
  try {
    // if urlString is not a well-formed URL, it will throw an error
    // TODO: Should we do a get fetch to make sure we have a heartbeat?
    const url = new URL(urlString);
    if (url.host.length > 5) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};
