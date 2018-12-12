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
};

module.exports = setting;