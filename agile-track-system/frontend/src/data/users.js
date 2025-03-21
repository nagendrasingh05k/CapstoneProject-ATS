const users = [
    { email: "user@example.com", password: "user123", role: "user" },
    { email: "admin@example.com", password: "admin123", role: "admin" },
  ];
  
  export const addUser = (email, password) => {
    users.push({ email, password, role: "user" }); 
  };
  
  export default users;
  