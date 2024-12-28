  const AuthService = require('../services/authService');

class AuthController {
    async register(req, res) {
        try {
            const { email, password, Nome, Sobrenome, rm, etec, curso } = req.body;
            await AuthService.createUser(email, password, Nome, Sobrenome, rm, etec, curso);
            res.render('user/register-success', { message: 'Cadastro realizado! Verifique seu e-mail para ativar a conta.' });
        } catch (error) {
            console.error(error);
            res.render('user/register', { error: error.message });
        }
    }

    async login(req, res) {
        const { rm, password, school } = req.body;
        try {
            const user = await AuthService.login(rm, password, school);
            req.session.user = user;
            res.redirect('/tasks');
        } catch (error) {
            console.error(error);
            res.render('user/login', { error: error.message });
        }
    }

    async logout(req, res) {
        try {
            req.session.destroy((err) => {
                if (err) {
                    console.error('Erro ao destruir a sessão:', err);
                    return res.status(500).send('Erro ao fazer logout.');
                }
                res.redirect('/login');
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao processar o logout.');
        }
    }

    // Método para verificar o e-mail do usuário
    async confirmEmail(req, res) {
        const { token } = req.params;
        try {
            const success = await AuthService.verifyEmailToken(token);
            if (success) {
                res.render('user/confirmation-success', { message: 'E-mail confirmado com sucesso! Agora você pode fazer login.' });
            } else {
                res.render('user/confirmation-failed', { error: 'Token inválido ou expirado.' });
            }
        } catch (error) {
            console.error(error);
            res.render('user/confirmation-failed', { error: 'Erro ao confirmar o e-mail.' });
        }
    }

    // Método para solicitar redefinição de senha
    async requestPasswordReset(req, res) {
        const { email } = req.body;
        try {
            const success = await AuthService.requestPasswordReset(email);
            if (success) {
                res.render('user/reset-request-success', { message: 'Link para redefinição de senha enviado para seu e-mail.' });
            } else {
                res.render('user/reset-password', { error: 'E-mail não encontrado.' });
            }
        } catch (error) {
            console.error(error);
            res.render('user/reset-password', { error: 'Erro ao processar a solicitação de redefinição.' });
        }
    }

    // Método para redefinir senha usando o token
    async resetPassword(req, res) {
        const { token } = req.params;
        const { password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.render('user/reset-password-token', { token, error: 'As senhas não coincidem.' });
        }
        try {
            const success = await AuthService.resetPassword(token, password);
            if (success) {
                res.render('user/reset-success', { message: 'Senha redefinida com sucesso! Agora você pode fazer login.' });
            } else {
                res.render('user/reset-password-token', { token, error: 'Token inválido ou expirado.' });
            }
        } catch (error) {
            console.error(error);
            res.render('user/reset-password-token', { token, error: 'Erro ao redefinir a senha.' });
        }
    }
}

module.exports = new AuthController();
