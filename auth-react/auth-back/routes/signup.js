const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user");


router.post("/", async (req, res) => {
  const {username, name, password} = req.body;

  if (!!!username || !!!name || !!!password){
    return res.status(400).json(
      jsonResponse(400, {
        error: "Fallo el requerimiento"
      })
    );
  }

  //crear usuario en la base de datos
  try {

    const user = new User();
    const exists = await user.usernameExist(username);
  
    if(exists){
      return res.status(400).json(
        jsonResponse(400, {
          error: "Username already exists",
        })
      );
    }
  
    const newUser = new User({ username, name, password });
  
    newUser.save();
  
    res.status(200).json(jsonResponse(200, { message: "Usuario creado exitosamente"}));
  
    res.send("singout");
  
  } catch (error) {
    res.status(500).json(
      jsonResponse(500, {
        error: "Error creating User",
      })
    );
  }

  
});

module.exports = router;