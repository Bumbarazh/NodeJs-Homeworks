const fs = require('fs-extra').promises;
const path = require('path');
const uuid = require('uuid').v1();

const {
    DELETED,
    USER_IS_UPDATED,
    CREATED,
    PHOTOS_DIR,
    PUBLIC_DIR,
    USER_DIR,
    USER_CREATED,
    USER_DELETED
} = require('../../constants/constants');
const { WELCOME, GOODBYE } = require('../../constants/email-actions.enum');
const {
    userService,
    authService,
    emailService,
    logService
} = require('../../services');
const { passwordHelper } = require('../../helpers');
const { transactionInstance } = require('../../dataBase').getInstance();

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
        const transaction = await transactionInstance();

        try {
            const { avatar, body: { nickname, email } } = req;
            const password = await passwordHelper.hash(req.body.password);

            Object.assign(req.body, { password });

            const createUser = await userService.insertUser(req.body, transaction);

            if (avatar) {
                const fileFormat = avatar.name.split('.').pop();
                const photoName = `${uuid}.${fileFormat}`;
                const pathWithoutPublic = path.join(USER_DIR, `${createUser.id}`, PHOTOS_DIR);
                const photoDir = path.join(process.cwd(), PUBLIC_DIR, pathWithoutPublic);
                const finalPhotoPath = path.join(pathWithoutPublic, photoName);

                await fs.mkdir(photoDir, { recursive: true });
                await avatar.mv(path.join(photoDir, photoName));
                await userService.updateUserById(createUser.id,
                    { avatar: finalPhotoPath },
                    transaction);
            }

            await emailService.sendMail(email, WELCOME, { userName: nickname });
            await logService.createLogs({
                action: USER_CREATED,
                time_of_action: new Date(),
                user_id: createUser.id
            });

            await transaction.commit();

            res.json(CREATED);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        const transaction = await transactionInstance();

        try {
            const { nickname, email } = req.body;
            const { id } = req.params;
            const { accessToken } = req;

            await userService.removeUserById(id, transaction);
            await authService.removeToken(accessToken, transaction);
            await emailService.sendMail(email, GOODBYE, { userName: nickname });

            await transaction.commit();
            await logService.createLogs({
                action: USER_DELETED,
                time_of_action: new Date(),
                user_id: id
            });
            res.json(DELETED);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    updateExistUser: async (req, res, next) => {
        const transaction = transactionInstance();

        try {
            const { nickname } = req.body;
            const { id } = req.params;
            const { avatar } = req;

            if (avatar) {
                const pathWithoutPublic = path.join(USER_DIR, `${id}`, PHOTOS_DIR);
                const pathForRemoveDir = path.join(USER_DIR, `${id}`);
                const photoDir = path.join(process.cwd(), PUBLIC_DIR, pathWithoutPublic);
                const fileFormat = avatar.name.split('.').pop();
                const photoName = `${uuid}.${fileFormat}`;
                const finalPhotoPath = path.join(pathWithoutPublic, photoName);

                await fs.rmdir(pathForRemoveDir, { recursive: true });
                await fs.mkdir(photoDir, { recursive: true });
                await avatar.mv(path.join(photoDir, photoName));
                await userService.updateUserById(
                    id,
                    { avatar: finalPhotoPath },
                    transaction
                );
            }

            await userService.updateUser(nickname, id, transaction);

            await transaction.commit();
            await logService.createLogs({
                action: USER_IS_UPDATED,
                time_of_action: new Date(),
                user_id: id
            });
            res.json(USER_IS_UPDATED);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    }
};
