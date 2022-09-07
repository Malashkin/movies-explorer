function getContent() {
  return fetch("http://localhost:3001/users/me", {
    credentials: "include",
    cache: "no-cache",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}

export default getContent;
