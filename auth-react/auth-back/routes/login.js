const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!!!username || !!!password) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "Fallo el requerimiento",
      })
    );
  }

  const user = await User.findOne({ username });

  if (user) {
    const correctPassword = await user.comparePassword(password, user.password);

    if (correctPassword) {
      //autenticar usuario
      const accessToken = user.createAccessToken();
      const refreshToken = user.createRefreshToken();

      res
        .status(200)
        .json(jsonResponse(200, { user, accessToken, refreshToken }));
    } else {
      res.status(400).json(
        jsonResponse(400, {
          erro: "Usuario o contraseña incorecto",
        })
      );
    }

  } else {
    res.status(400).json(
      jsonResponse(400, {
        erro: "User not found",
      })
    );
  }
});

module.exports = router;
