module.exports = {
    MIN_AGE: 12,
    MAX_AGE: 120,

    DB_PACKAGE: 'dataBase',
    DB_MODELS: 'models',

    DELETED: 'Deleted',
    USER_IS_UPDATED: 'User is updated',
    CREATED: 'Created',

    USERS_TABLE_NAME: 'users',
    CARS_TABLE_NAME: 'cars',
    OAUTH_TABLE_NAME: 'o_auth',
    ID: 'id',
    CASCADE: 'CASCADE',

    CAR_MODEL_NAME: 'Car',
    OAUTH_MODEL_NAME: 'O_Auth',
    USER_MODEL_NAME: 'User',

    AUTHORIZATION: 'Authorization',
    USER_IS_LOGGED_IN: 'User is already logged in',
    CAR_IS_CREATED: 'Car is Created',

    PHOTO_MAX_SIZE: 3 * 1024 * 1024,
    DOC_MAX_SIZE: 6 * 1024 * 1024,
    DOC_MIMETYPES: [
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/pdf',
    ],
    PHOTO_MIMETYPES: [
        'image/tiff',
        'image/webp',
        'image/png',
        'image/gif',
        'image/jpeg',
    ],
    MAX_FILES_LENGTH: 10,

    USER_DIR: 'user',
    PHOTOS_DIR: 'photos',
    PUBLIC_DIR: 'public'
};
