const Role = require('../../models/role.model');

const systemConfig = require("../../config/system");

// [GET] /admin/roles/
module.exports.index = async (req, res) => {
    const records = await Role.find({
        deleted: false
    });

    res.render("admin/pages/roles/index", {
      pageTitle: "Nhóm quyền",
      records: records
    });
}

// [GET] /admin/create/
module.exports.create = (req, res) => {
    res.render("admin/pages/roles/create", {
      pageTitle: "Nhóm quyền"
    });
}

// [POST] /admin/create/
module.exports.createPost = async (req, res) => {
    const record = new Role(req.body);
    await record.save();

    res.redirect(`/${systemConfig.prefixAdmin}/roles`);
}

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const record = await Role.findOne({
            _id: req.params.id,
            deleted: false
          });
        
          res.render("admin/pages/roles/edit", {
            pageTitle: "Chỉnh sửa Nhóm quyền",
            record: record
          });
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/roles`);
    }
}
  
// [PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
        await Role.updateOne({
        _id: req.params.id,
        deleted: false
        }, req.body);
    
        res.redirect(`back`);
    } catch (error) {
        res.redirect(`/${systemConfig.prefixAdmin}/roles`);
    }
}

// [GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
    const records = await Role.find({
      deleted: false
    });
  
    res.render("admin/pages/roles/permissions", {
      pageTitle: "Phân quyền",
      records: records
    });
}

// [PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
  const roles = JSON.parse(req.body.roles);

  try {
    for (const item of roles) {
      await Role.updateOne({
        _id: item.id
      }, {
        permissions: item.permissions
      });
    }

    req.flash("success", "Cập nhật phân quyền thành công !");
  } catch (error) {
    req.flash("error", "Cập nhật phân quyền không thành công !");
  }
  res.redirect('back');
}