const getAttribute = (requestedAuthorities) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const currentUserAuthorities = userData.roleList;
  return requestedAuthorities.every((requestedAuth) =>
    currentUserAuthorities.includes(requestedAuth)
  );
};

export default getAttribute;
/*
  Код для теста

  const grantPermission = (requestedAuthorities, currentUserAuthorities) => {
    return requestedAuthorities.every(requestedAuthority => currentUserAuthorities.includes(requestedAuthority));
  };

  const requestedAuthorities = [1, 2, 3];
  const currentUserAuthorities = [1, 2, 4, 5]

  console.log(grantPermission(requestedAuthorities, currentUserAuthorities))
*/
