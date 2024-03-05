const users = [
    { username: "123", password: "123", admin: false },
    { username: "444", password: "444", admin: false },
    // 추가적인 사용자 정보 추가 가능
  ];
  // 사용자 생성 함수
  function createUser(username, password) {
    const newUser = { username, password, admin: false };
    users.push(newUser);
    return newUser; // 단일 객체로 반환
  }
  

  // 사용자 검색 함수
  function findUserByUsername(username) {
    return users.find((user) => user.username === username);
  }
  
  // 사용자 비밀번호 검증 함수
  function verifyUserPassword(user, password) {
    return user && user.password === password;
  }
  
  // 사용자에게 admin 권한 부여 함수
  function assignAdmin(user) {
    if (user) {
      user.admin = true;
    }
  }
  
  module.exports = {
    createUser,
    findUserByUsername,
    verifyUserPassword,
    assignAdmin,
    users
  };