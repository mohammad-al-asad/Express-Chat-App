const uploadObj = require("../../utilities/uploadObj");

function avatarUploader(req, res, next) {
  const upload = uploadObj(
    "avatars",
    1000000,
    ["image/jpeg", "image/jpg", "image/png"],
    "only .jpeg, .jpg, .png allowed"
  );

  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avatar: {
            message: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
}

module.exports = avatarUploader;
