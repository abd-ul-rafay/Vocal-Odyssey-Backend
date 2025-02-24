const login = (req, res) => res.json({ message: 'Login successful' });
const signup = (req, res) => res.json({ message: 'Signup successful' });
const googleSignin = (req, res) => res.json({ message: 'Google sign-in successful' });
const recoverPassword = (req, res) => res.json({ message: 'Password recovery email sent' });

module.exports = { login, signup, googleSignin, recoverPassword };
