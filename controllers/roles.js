const getConnection = require("../db");
const { setKeysValuesToString } = require("../utils/helpers");
const Controllers = require("../utils/controllers");

exports.roles_get_all = (req, res) => {
  return Controllers.tableGetAll("role", res);
};

exports.roles_get_role = (req, res) => {
  return Controllers.tableGetOne("role", req, res);
};

exports.roles_add_role = (req, res) => {
  return Controllers.tableCreateOne("role", req, res);
};

exports.roles_update_role = (req, res) => {
  const { roleId } = req.params;
  const bodyKeys = Object.keys(req.body);
  const bodyValues = Object.values(req.body);
  const authorizedKeys = ["name"];
  const isAuthorized = bodyKeys.every(key => authorizedKeys.includes(key));

  const setValues = setKeysValuesToString(bodyKeys, bodyValues);

  const queryString = `UPDATE role SET ${setValues} WHERE id=(?)`;
  if (isAuthorized) {
    getConnection.query(queryString, [roleId], (error, result) => {
      if (error) {
        return res.status(500).json({
          message: "Failed to update role",
          queryString,
          error
        });
      }
      res.status(200).json({
        message: "Successfully updated role",
        queryString,
        result
      });
    });
  } else {
    res.status(500).json({
      message: "Update not authorized"
    });
  }
};

exports.roles_delete_role = (req, res) => {
  const { roleId } = req.params;
  const queryString = "DELETE FROM role WHERE id= (?)";
  getConnection.query(queryString, [roleId], (error, results) => {
    const roleNotExist = results.affectedRows === 0;
    if (error || roleNotExist) {
      return res.status(500).json({
        message: `Role with id=${roleId} does not exists`,
        error
      });
    }
    res.status(200).json({
      message: "Role successfully deleted",
      roleId
    });
  });
};
