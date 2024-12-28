const adminService = require('../services/adminService');
const { sendRegistrationApprovalEmail } = require('../services/emailService');
const { generateToken } = require('../utils/tokenGenerator');
const prisma = require('../config/database');

exports.getLogin = (req, res) => {
    if (req.session.userId) {
        return res.redirect("/estrutura"); 
    }                                          
    res.render("content/loginAdm", {
        title: 'Login',                   
        error: req.query.error || null
    });
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.redirect("/loginAdm?error=email_required");
    }

    try {
        const user = await adminService.findUserByEmail(email);

        if (!user) {
            return res.redirect("/loginAdm?error=user_not_found");
        }

        if (!user.approved) {
            return res.redirect("/loginAdm?error=not_approved");
        }

        const isPasswordValid = await adminService.verifyPassword(password, user.password);
        if (!isPasswordValid) {
            return res.redirect("/loginAdm?error=invalid_password");
        }

        req.session.userId = user.id;
        req.session.userEmail = user.email;
        return res.redirect("/estrutura"); 
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        return res.redirect("/loginAdm?error=server");
    }
};

exports.getRegister = (req, res) => {
    if (req.session.userId) {
        return res.redirect("/estrutura"); 
    }
    res.render("content/registerAdm", {
        title: 'Registrar-se',
        error: req.query.error || null
    });
};

exports.postRegister = async (req, res) => {
    const { admin, email, etec, password } = req.body;

    try {
        const approvalToken = generateToken();
        const user = await adminService.createUser(admin, email, etec, password, approvalToken);

        await sendRegistrationApprovalEmail(user);

        res.redirect('/loginAdm?isRegister=true'); 
    } catch (error) {
        console.error("Erro ao registrar administrador:", error.message);
        res.redirect('/registerAdm?error=unknown');
    }
};

exports.approveUser = async (req, res) => {
    const { token } = req.params;

    try {
        const user = await prisma.admin.findFirst({
            where: { approvalToken: token },
        });

        if (!user) {
            return res.status(404).send("Usuário não encontrado.");
        }

        const updatedUser = await prisma.admin.update({
            where: { id: user.id },
            data: { approved: true, approvalToken: null },
        });

        res.send(`<h3>O usuário ${updatedUser.admin} foi aprovado com sucesso.</h3>`);
    } catch (error) {
        console.error("Erro ao aprovar usuário:", error.message);
        res.status(500).send("Erro ao aprovar usuário.");
    }
};

exports.rejectUser = async (req, res) => {
    const { token } = req.params;

    try {
        const user = await prisma.admin.delete({
            where: { approvalToken: token },
        });

        res.send(`<h3>O usuário ${user.name} foi rejeitado com sucesso.</h3>`);
    } catch (error) {
        console.error("Erro ao rejeitar usuário:", error.message);
        res.status(500).send("Erro ao rejeitar usuário.");
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Erro ao encerrar sessão:", err);
            return res.redirect("/estrutura"); 
        }
        res.redirect("/loginAdm"); 
    });
};
