module.exports = {
    PORT:8000,
    POST_MAX_SIZE: 40, //MB
    UPLOAD_MAX_FILE_SIZE: 40, //MB , less than or equal POST_MAX_SIZE
    PROJECT_DIR : __dirname, // Project Directory
    VIEWS_DIR:'views', // Views Directory
    CONTROLLERS_DIR:'controllers', // Controllers Directory
    DB_HOST:"localhost",
    DB_PASS:'root',
    DB_USER:'root',
    DB_NAME:'coacharabia'
};