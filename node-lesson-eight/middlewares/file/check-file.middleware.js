const {
    errors: {
        TOO_BIG_FILE,
        WRONG_FILE_EXTENSION,
        ONLY_ONE_PHOTO
    }, ErrorHandler
} = require('../../error');
const {
    PHOTO_MAX_SIZE,
    DOC_MAX_SIZE,
    DOC_MIMETYPES,
    PHOTO_MIMETYPES,
    MAX_FILES_LENGTH
} = require('../../constants/constants');

module.exports = {
    checkFilesOrPhotosForCar: (req, res, next) => {
        try {
            const { files } = req;

            const photos = [];
            const docs = [];

            const allFiles = Object.values(files);

            for (let i = 0; i < allFiles.length; i++) {
                const { mimetype, size } = allFiles[i];

                if (DOC_MIMETYPES.includes(mimetype)) {
                    if (DOC_MAX_SIZE < size) {
                        throw new ErrorHandler(TOO_BIG_FILE.message, TOO_BIG_FILE.code);
                    }

                    if (docs.length <= MAX_FILES_LENGTH) {
                        docs.push(allFiles[i]);
                    }
                } else if (PHOTO_MIMETYPES.includes(mimetype)) {
                    if (PHOTO_MAX_SIZE < size) {
                        throw new ErrorHandler(TOO_BIG_FILE.message, TOO_BIG_FILE.code);
                    }

                    if (photos.length <= MAX_FILES_LENGTH) {
                        photos.push(allFiles[i]);
                    }
                } else {
                    throw new ErrorHandler(WRONG_FILE_EXTENSION.message, WRONG_FILE_EXTENSION.code);
                }
            }

            req.photos = photos;
            req.docs = docs;

            next();
        } catch (e) {
            next();
        }
    },
    checkAvatarForUser: (req, res, next) => {
        try {
            const { files } = req;
            const allFiles = Object.values(files);

            if (allFiles.length > 1) {
                throw new ErrorHandler(ONLY_ONE_PHOTO.message, ONLY_ONE_PHOTO.code);
            }

            for (let i = 0; i < allFiles.length; i++) {
                const { mimetype, size } = allFiles[i];

                if (PHOTO_MIMETYPES.includes(mimetype)) {
                    if (PHOTO_MAX_SIZE < size) {
                        throw new ErrorHandler(TOO_BIG_FILE.message, TOO_BIG_FILE.code);
                    }

                    req.avatar = allFiles[i];
                }
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
