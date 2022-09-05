const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/ipss/fe/gen-chk-rpt/latest/',
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'genChkRpt',
            filename: 'remoteEntry.js',
            exposes: {
                './GenChkRptApp': './src/bootstrap'
            },
            shared: ['react', 'react-dom']
        })
    ]

};
module.exports = merge(commonConfig, prodConfig);