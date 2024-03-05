const {createUser,findUserByUsername,assignAdmin,verifyUserPassword,users}  = require('../../../Userpage/user')
const jwt = require('jsonwebtoken')

exports.register =  (req, res) => {
    try {
        const { username, password } = req.body;

        // 사용자가 이미 존재하는지 확인
        const existingUser =  findUserByUsername(username);
        if (existingUser) {
            throw new Error('이미 존재하는 사용자명입니다');
        }

        // 새로운 사용자 생성
        const newUser =  createUser(username, password);

        // 새 사용자를 생성한 후 사용자 수를 세기
        const userCount = users.length;

        // 사용자 수가 1이면 어드민 권한 부여
        if (userCount === 1) {
             assignAdmin(newUser);
        }

        // 클라이언트에 응답
        res.json({
            message: '가입 성공',
            admin: newUser.admin ? true : false,
        });
        console.log(users);

    } catch (error) {
        // 에러 처리
        res.status(409).json({
            message: error.message,
            error: true, 

        });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const secret = req.app.get('jwt-secret');

    try {
        // 사용자가 존재하는지 확인
        const user = await findUserByUsername(username);
        if (!user) {
            throw new Error('아이디가 존재하지 않습니다.');
        }

        // 비밀번호 확인
        const isPasswordValid = verifyUserPassword(user, password);
        if (!isPasswordValid) {
            throw new Error('비밀번호가 일치하지 않습니다.');
        }

        // 토큰 생성
        const token = await new Promise((resolve, reject) => {
            jwt.sign(
                {
                    _id: user._id,
                    username: user.username,
                    admin: user.admin
                },
                secret,
                {
                    expiresIn: '7d',
                    issuer: 'velopert.com',
                    subject: 'userInfo'
                },
                (err, token) => {
                    if (err) reject(err);
                    resolve(token);
                }
            );
        });

        // 응답
        res.json({
            message: '로그인 성공',
            token
        });
    } catch (error) {
        // 에러 처리
        res.status(403).json({
            message: error.message,
            error: true, 
        });
    }
};

exports.check = (req, res) => {
    res.json({
        success: true,
        info: req.decoded
    })
}