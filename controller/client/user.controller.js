const User = require('../../models/user.model');
const ForgotPassword = require('../../models/forgot-password.model');
const md5 = require('md5');

const generateHelper = require('../../helpers/generate.helper');

// [GET] /user/register
module.exports.register = async (req, res) => {
    res.render("client/pages/user/register", {
      pageTitle: "Đăng ký tài khoản",
    });
};

// [POST] /user/register
module.exports.registerPost = async (req, res) => {
    const existEmail = await User.findOne({
        email: req.body.email,
        deleted: false
    });

    if(existEmail){
        req.flash("error", `Email đã tồn tại!`);
        res.redirect("back");
        return; 
    }

    const infoUser = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: md5(req.body.password),
        tokenUser: generateHelper.generateRandomString(30)
    };

    const user = new User(infoUser);
    await user.save();

    res.cookie("tokenUser", user.tokenUser);

    res.redirect('/');
};

// [GET] /user/login
module.exports.login = async (req, res) => {
    res.render("client/pages/user/login", {
      pageTitle: "Đăng nhập",
    });
};

// [POST] /user/login
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
        email: email,
        deleted: false,
    });

    if (!user) {
        req.flash("error", "Email không tồn tại!");
        res.redirect("back");
        return;
    }

    if (md5(password) !== user.password) {
        req.flash("error", "Sai mật khẩu!");
        res.redirect("back");
        return;
    }

    if (user.status !== "active") {
        req.flash("error", "Tài khoản đang bị khóa!");
        res.redirect("back");
        return;
    }

    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/");
};

// [GET] /user/logout
module.exports.logout = async (req, res) => {
    res.clearCookie("tokenUser");
    res.redirect("/");
};

// [GET] /user/password/forgot
module.exports.forgotPassword = async (req, res) => {
    res.render('client/pages/user/forgot-password', {
        pageTitle: "Lấy lại mật khẩu",
    });
};

// [POST] /user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
    const email = req.body.email;
    console.log(email);

    const user = await User.findOne({
        email: email,
        deleted: false
    });

    if(!user){
        req.flash('error', 'Email không tồn tại!');
        res.redirect('back');
        return;
    }

    //1: Lưu thông tin vào database
    const otp = generateHelper.generateRandomNumber(6);

    const objectForgotPassword = {
        email: req.body.email,
        otp: otp,
        expiresAt: Date.now() + 5
    }

    const record = new ForgotPassword(objectForgotPassword);
    await record.save();
    
    //2: Gửi mã OTP qua email

    res.redirect(`/user/password/otp?email=${email}`);
};

// [GET] /user/password/otp
module.exports.otpPassword = async (req, res) => {
    const email = req.query.email;
  
    res.render("client/pages/user/otp-password", {
      pageTitle: "Nhập mã OTP",
      email: email,
    });
};

// [POST] /user/password/otp
module.exports.otpPasswordPost = async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;

    const find = {
        email: email,
        otp: otp
    };

    const result = await ForgotPassword.findOne(find);

    if(!result) {
        req.flash("error", "OTP không hợp lệ!");
        res.redirect("back");
        return;
    }

    const user = await User.findOne({
        email: email
    });

    res.cookie('tokenUser', user.tokenUser);

    res.redirect(`/user/password/reset`);
};