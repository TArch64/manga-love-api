module.exports = {
    js2svg: {
        indent: 2,
        pretty: true,
    },
    multipass: true,
    plugins: [
        {
            name: 'preset-default',
            params: {
                overrides: {
                    removeViewBox: false,
                },
            },
        },
        'removeDimensions',
        'convertStyleToAttrs',
        {
            name: 'removeAttrs',
            params: {
                attrs: 'data.*',
            },
        },
    ],
};
