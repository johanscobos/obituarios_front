export const isAuthenticated=() => localStorage.getItem('Token')? true: false;
//export const isRol=() => false;
//export const hasRole = (user, roles) =>
//  roles.some(role => user.roles.includes(role));