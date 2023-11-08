const router = require("express").Router();
const connection = require("../../database");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "/upload"));
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
      },
    }),
    limits: {
      fileSize: 20000,
    },
    fileFilter: (req, file, cb) => {
      console.log(file);
      cb(null, true);
    },
  });

router.post("/register", upload.single("avatar"), async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    let avatar;
    if (req.file === undefined) {
      avatar = null;
    } else {
      avatar = req.file.filename;
    }
    const { username, email, password } = req.body;
    const sqlVerify = "SELECT * FROM users WHERE email= ?";
    const hashedPassword = await bcrypt.hash(password, 10);
    connection.query(sqlVerify, [email], (err, result) => {
      if (err) throw err;
      if (result.length) {
        let isEmail = { message: "Email existant" };
        if (avatar) {
          const filePath = path.join(__dirname, "/upload", avatar);
          fs.unlink(filePath, (err) => {
            if (err) {
              console.log("Erreur suppression fichier");
            }
            console.log("Fichier supprimé");
          });
        }
        console.log({ avatar });
        res.status(200).json(isEmail);
      } else {
        const sqlInsert =
          "INSERT INTO users (username, email, password, avatar) VALUES (?, ?, ?, ?)";
        connection.query(
          sqlInsert,
          [username, email, hashedPassword, avatar],
          (err, result) => {
            if (err) throw err;
            let isEmail = {
              messageGood: "Inscription réussie ! Vous allez être redirigé(e)",
            };
            res.status(200).json(isEmail);
          }
        );
      }
    });
  });
  
router.post("/login", async (req, res) =>{
      console.log(req.body);
      let isEmail;
      const { email, password } = req.body;
      const sqlVerify = "SELECT * FROM `users` WHERE `email` =  ?";
      connection.query(sqlVerify, [email], async (err, result) =>{
          if(err) throw err;
          if(result.length !== 0){
              const isPasswordValid = await bcrypt.compare(password, result[0].password);
              if(isPasswordValid){
                  isEmail = { messageGood: "Connexion réussite",
                              id: result[0].id};
              } else{
                  isEmail = { message: "Connexion refuser"};
              }
          } else{
              isEmail = { message: "L'email n'existe pas"};
          }
      res.status(200).json(isEmail);
      })
  })
  
router.get("/getUser/:id", (req, res) => {
      console.log(req.params);
      let id = req.params.id;
      const sql = "SELECT username, email, avatar FROM users where id= ?";
      connection.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.status(200).json(result[0]);
      });
    });

module.exports = router;