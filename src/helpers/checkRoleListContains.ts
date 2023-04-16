const checkRoleListContains = (parentArray: any[], subsetArray: any[]) => {
  return subsetArray.every((roleName) => {
    return parentArray.some((role) => role['roleName'] === roleName);
  });
};

export default checkRoleListContains;
