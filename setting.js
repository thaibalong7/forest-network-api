var setting = {
    databaseConfig: {
        uri: 'postgres://ujvjgtlxrmypna:7c455b13d18a3a8f912090adb5f9c51d8cf2ad3895a739790b7c3f478da3d172@ec2-54-83-23-121.compute-1.amazonaws.com:5432/d463j70tmkodfh',
        database: 'd463j70tmkodfh',
        username: 'ujvjgtlxrmypna',
        password: '7c455b13d18a3a8f912090adb5f9c51d8cf2ad3895a739790b7c3f478da3d172',
        host: 'ec2-54-83-23-121.compute-1.amazonaws.com',
        dialect: 'postgres',
        operatorsAliases: false,
        protocol: 'postgres',
        dialectOptions: {
            ssl: true
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        logging: false,
    },
    tblong_account: {
        email: 'thaibalong7@gmail.com',
        secret_key: 'SA7WQQFVYUGHKKCOVQSRCDAPB27CHVCTXUXDM62ZFCY5KUSY26A4NGB6',
        public_key: 'GCDSE5FJMNUSS7UICOVCWNLVX5IGZBPRWW6O2MPX7ARRKXUO4CYVFZTL',
        secret_key_base64: 'P2hAtcUMdShOrCURDA8OviPUU70uNntZKLHVUljXgcaHInSpY2kpfogTqis1db9QbIXxtbztMff4IxVejuCxUg==',
        public_key_base64: 'hyJ0qWNpKX6IE6orNXW/UGyF8bW87TH3+CMVXo7gsVI=',
        tenermint_address: 'E2CCD6367AD3FDAEF8F23A2DBBAA1F008BD6A27D'
    },
    nhhung_account: {
        public_key: 'GCMRFYNDA6NG3LLRL6WSTBGWMXGQICNYH573RX2VVSU27SKIJHIHJU3I',
        secret_key: 'SBXBL47OX2ZC3J54F5GTOMUDPVTA5BDQIPWRFEJ2QWAUMYQGZZF7NH6D'
    },
    llly_account: {
        secret_key: 'SB5IC37H4EGQ7WBKAT3DGZSZPXC5DC6I6MKEGVNH3JU25TTMPOCVDEFM',
        public_key: 'GDLYZVOXF3Q4YY4YBVD4XPJW2HY34SRFXEH3KABJVQGGQJEAQF7OO2FF',
        secret_key_base64: 'eoFv5+END9gqBPYzZll9xdGLyPMUQ1Wn2mmuzmx7hVHXjNXXLuHMY5gNR8u9NtHxvkoluQ+1ACmsDGgkgIF+5w==',
        public_key_base64: '14zV1y7hzGOYDUfLvTbR8b5KJbkPtQAprAxoJICBfuc=',
        tenermint_address: 'EC13162A4FBF365E9F0A318A7B49E49BEAF4F7BE',
    }
};

module.exports = setting;