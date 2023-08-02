import { db } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  //CHECK user
  const q = "SELECT * FROM users WHERE email = ? OR name = ?";

  db.query(q, [req.body.useremail, req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exists!");

    //Hash the password and user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.userpassword, salt);

    const query = "INSERT INTO users (`name`, `email`, `password`) VALUES (?)";

    const values = [req.body.username, req.body.useremail, hash];

    db.query(query, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  //CHECK USER

  const q = "SELECT * FROM users WHERE name = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.userpassword,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ id: data[0].id }, "jwtkey");
    const { password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};

export const password = (req, res) => {
  //CHECK USER

  const q = "SELECT * FROM users WHERE name = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.oldPassword,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Contraseña equivocada!");

    const newPassword = req.body.newPassword;
    const repPassword = req.body.repPassword;

    if (newPassword !== repPassword)
      return res
        .status(400)
        .json("Verifica que las contraseñas sean las mismas");

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.newPassword, salt);

    const sqlUpdate = "UPDATE users SET password = ?";

    db.query(sqlUpdate, [hash], (err, data) => {
      if (err) return res.send(err);

      return res.status(200).json("Contraseña cambiada exitosamente");
    });
  });
};
