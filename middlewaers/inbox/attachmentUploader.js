const uploadObj = require("../../utilities/multipleUploadObj");

function attachmentUploader(req, res, next) {

  const uploader = uploadObj("attachments", 10000000, 2, [
    "image/jpeg",
    "image/jpg",
    "image/png",
]);

  uploader.any()(req, res, (err) => {
    if (err) {

      res.status(500).json({
        errors: {
          common: {
            msg: err.message,
          },
        },
      });
    } else {
      
      next();
    }
  });
}


module.exports = attachmentUploader
