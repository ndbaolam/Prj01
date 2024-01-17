const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer();

const uploadCloud = require('../../middlewares/admin/uploadCloud.middleware');

const controller = require('../../controller/admin/product-category.controller');

const validate = require("../../validates/admin/product-category.validate");

router.get('/', controller.index);

router.get('/create', controller.create);

router.post(
    '/create', 
    upload.single('thumbnail'),
    uploadCloud.uploadSingle,
    validate.createPost,
    controller.createPost
);

router.get('/edit/:id', controller.edit);

router.patch(
    "/edit/:id",
    upload.single('thumbnail'),
    uploadCloud.uploadSingle,
    validate.createPost,
    controller.editPatch
);

module.exports = router;