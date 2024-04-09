const uploadObj = require("../../utilities/uploadObj");

function avatarUploader(req, res, next) {
  const upload = uploadObj(
    "avatars",
    5000000,
    ["image/jpeg", "image/jpg", "image/png"],
    "only .jpeg, .jpg, .png allowed"
  );

  upload.any()(req, res, (err) => {
    if (err) {
      console.log(err.message);
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
}

module.exports = avatarUploader;
