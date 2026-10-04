const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../uploads"));
    },

    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname);
        const filename = `animal-${Date.now()}${extension}`;

        cb(null, filename);
    }
});

const upload = multer({
    storage: storage,

    limits: {
        fileSize: 10 * 1024 * 1024
    },

    fileFilter: function (req, file, cb) {

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only JPG, PNG and WEBP images are allowed."));
        }
    }
});

const uploadAnimalImage = (req, res) => {

    upload.single("animalImage")(req, res, function (err) {

        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No animal image uploaded."
            });
        }

        res.json({
            success: true,
            message: "Animal image uploaded successfully.",
            file: {
                filename: req.file.filename,
                path: `/uploads/${req.file.filename}`,
                size: req.file.size,
                type: req.file.mimetype
            }
        });
    });
};

module.exports = {
    uploadAnimalImage
};