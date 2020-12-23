const fs = require('fs-extra').promises;
const path = require('path');
const uuid = require('uuid').v1();

const {
    DELETED,
    USER_IS_UPDATED,
    CREATED,
    PHOTOS_DIR,
    PUBLIC_DIR,
    USER_DIR
} = require('../../constants/constants');
const { WELCOME, GOODBYE } = require('../../constants/email-actions.enum');
const { userService, authService, emailService } = require('../../services');
const { passwordHelper } = require('../../helpers');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findAllUsers();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: (req, res, next) => {
        try {
            const { user } = req;

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    registerUser: async (req, res, next) => {
        try {
            const { avatar, body: { nickname, email } } = req;
            const password = await passwordHelper.hash(req.body.password);

            Object.assign(req.body, { password });

            const createUser = await userService.insertUser(req.body);

            if (avatar) {
                const pathWithoutPublic = path.join(USER_DIR, `${createUser.id}`, PHOTOS_DIR);
                const photoDir = path.join(process.cwd(), PUBLIC_DIR, pathWithoutPublic);
                const fileFormat = avatar.name.split('.').pop();
                const photoName = `${uuid}.${fileFormat}`;
                const finalPhotoPath = path.join(pathWithoutPublic, photoName);

                await fs.mkdir(photoDir, { recursive: true });
                await avatar.mv(path.join(photoDir, photoName));
                await userService.updateUserById(createUser.id, { avatar: finalPhotoPath });
            }

            await emailService.sendMail(email, WELCOME, { userName: nickname });

            res.json(CREATED);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const { nickname, email } = req.body;
            const { id } = req.params;
            const { accessToken } = req;

            await userService.removeUserById(id);
            await authService.removeToken(accessToken);
            await emailService.sendMail(email, GOODBYE, { userName: nickname });

            res.json(DELETED);
        } catch (e) {
            next(e);
        }
    },

    updateExistUser: async (req, res, next) => {
        try {
            const { nickname } = req.body;
            const { id } = req.params;

            await userService.updateUser(nickname, id);

            res.json(USER_IS_UPDATED);
        } catch (e) {
            next(e);
        }
    }
};
