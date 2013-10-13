module.exports = {
    DOMAIN: "localhost",
    PORT: 8001,
    POST_MAX_SIZE: 40, //MB
    UPLOAD_MAX_FILE_SIZE: 40, //MB , less than or equal POST_MAX_SIZE
    DIR: {
        PROJECT: __dirname, // Project Directory
        VIEWS: 'views', // Views Directory
        CONTROLLERS: 'controllers' // Controllers Directory
    },
    DB: {
        HOST: "localhost",
        USER: 'root',
        PASSWORD: 'root',
        DATABASE: 'coacharabia'
    },
    FILES: {

        FOLDER: "./static/",
        Downloadable: ['psd', 'docs', 'zip', 'rar', 'png'],
        Headers: {
            PDF: 'application/pdf',
            CSS: 'text/css',
            JS: 'text/javascript',
            HTML: 'text/html',
            TXT: 'text/plain',
            JPG: 'image/jpeg',
            JPEG: 'image/jpeg',
            GIF: 'image/gif ',
            DOWNLOAD: 'application/octet-stream'

        }


    }
};