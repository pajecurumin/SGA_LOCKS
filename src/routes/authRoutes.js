const express = require('express');
const { requireAuth } = require('../middleware/requireAuth');
const AuthController = require('../controllers/authController');
const AdminController = require('../controllers/adminController');
const CorredorController = require("../controllers/corredorController");
const router = express.Router();

// **Rotas de administração**
router.get('/loginAdm', AdminController.getLogin);
router.post('/loginAdm', AdminController.postLogin);
router.get('/registerAdm', AdminController.getRegister);
router.post('/registerAdm', AdminController.postRegister);
router.get('/approve/:token', AdminController.approveUser);
router.get('/reject/:token', AdminController.rejectUser);
router.get('/logoutAdm', AdminController.logout);

// **Rotas de autenticação de usuário**
router.get('/login', (req, res) => {
    res.render('user/login', { error: null });
});
router.post('/login', AuthController.login);

router.get('/register', (req, res) => {
    res.render('user/register', { error: null });
});
router.post('/register', AuthController.register);

router.get('/reset-password', (req, res) => {
    res.render('user/reset-password', { error: null });
});
router.post('/reset-password', AuthController.requestPasswordReset);

router.get('/reset-password/:token', (req, res) => {
    const { token } = req.params;
    res.render('user/reset-password-token', { token, error: null });
});
router.post('/reset-password/:token', AuthController.resetPassword);

router.get('/confirm/:token', AuthController.confirmEmail);

// **Rotas protegidas**
router.get('/dashboard', requireAuth, (req, res) => {
    res.render('dashboard');
});

router.get('/profile', requireAuth, (req, res) => {
    res.render('profile');
});

// Logout do usuário
router.get('/logout', AuthController.logout);

//rotas para armario


router.post('/corredor/add', CorredorController.createCorredor); // Criar corredor
router.get('/corredores', CorredorController.getAllCorredores); // Listar todos os corredores
router.get('/corredor/:id', CorredorController.getCorredorById); // Buscar corredor por ID
router.put('/corredor/:id', CorredorController.updateCorredor); // Atualizar corredor
router.delete('/corredor/:id/delete', CorredorController.deleteCorredor); // Deletar corredor




module.exports = router;
