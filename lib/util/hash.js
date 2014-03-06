var crypto = require('crypto'),
    crc = require('crc');
/* A hashing function that accepts data and returns the hash from the
 specified algorithm. Works for Buffers and strings. */
module.exports = {
    encrypt: function (data, algorithm) {
        if (data instanceof Buffer && crc.buffer[algorithm])
            return crc.buffer[algorithm](data);
        else if (crc[algorithm])
            return crc[algorithm](data);
        else
            return crypto.createHash(algorithm).update(data).digest('hex');
    },
    etag: function(data){
        return Number(data.length).toString(36) + "-" + new Number(this.encrypt(data, "crc32") + 0x80000000).toString(36)
    }
}