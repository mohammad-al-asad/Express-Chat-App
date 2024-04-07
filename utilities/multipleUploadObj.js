const multer = require("multer");
const path = require("path");
const createError = require("http-errors");

function uploadObj(subFolder, maxSizeAllowed, maxFile, allowedFileTypes) {
  const destination = path.join(`${__dirname}/../public/uploads/${subFolder}`);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();
      cb(null, fileName + fileExt);
    },
  });

  const uploadObj = multer({
    storage: storage,
    limits: {
      fileSize: maxSizeAllowed,
    },
    fileFilter: (req, file, cb) => {
      if (req.files.length > maxFile) {
        cb(createError(`Maximum ${maxFile} allowed`));
      } else {
        if (allowedFileTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(createError("This format is not allowed"));
        }
      }
    },
  })

  return uploadObj;
}

module.exports = uploadObj;
