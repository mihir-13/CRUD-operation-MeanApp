if(process.env.NODE_ENV === 'production'){
    module.exports = { mongoURI: 'mongodb://MihirB:rastablasta1@ds133094.mlab.com:33094/ideas-app' }
}
else {
    module.exports = { mongoURI: 'mongodb://MihirB:rastablasta1@ds133094.mlab.com:33094/ideas-app' }
}