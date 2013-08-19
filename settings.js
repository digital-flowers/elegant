module.exports = {
    PORT:8000,
    POST_MAX_SIZE: 40, //MB
    UPLOAD_MAX_FILE_SIZE: 40, //MB , less than or equal POST_MAX_SIZE
    PROJECT_DIR : __dirname, // Project Directory
    VIEWS_DIR:'views', // Views Directory
    CONTROLLERS_DIR:'controllers' // Controllers Directory
};