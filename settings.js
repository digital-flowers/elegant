module.exports = {
    DOMAIN: "localhost",
    PORT: 8001,
    POST_MAX_SIZE: 40, //MB
    UPLOAD_MAX_FILE_SIZE: 40, //MB , less than or equal POST_MAX_SIZE
    DIR: {
        PROJECT: __dirname, // project directory
        SESSION: __dirname + "/.session-data", // session data
        VIEWS: 'views', // views directory
        CONTROLLERS: 'controllers', // controllers directory
        STATIC: "static" // static content directory inside views
    },
    DEFAULT_THEME: "default",
    DB: {
        HOST: "localhost",
        USER: 'root',
        PASSWORD: '123',
        DATABASE: 'test'
    },
    STATIC: {
        HEADERS: {
            pdf: 'application/pdf',
            css: 'text/css',
            js: 'text/javascript',
            html: 'text/html',
            txt: 'text/plain',
            jpg: 'image/jpeg',
            gif: 'image/gif',
            png: 'image/png',
            jpeg: 'image/jpeg',
            jpg: 'image/jpg'
        }
    },
    ERROR: {
        REDIRECT: {
            //all:"/error/{code}",
            //404: "/error/404"
        }
    }
};