module.exports = {
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|webp)$/i,
                type: "asset/resource", // Ensures Webpack processes the file
            },
        ],
    },
};
