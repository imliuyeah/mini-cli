module.exports = (generator, options = {}) => {
    generator.render('./template', {
        hasPinia: options.features.includes('pinia'),
    })

    generator.extendPackage({
        dependencies: {
            vue: '^3.4.21',
        },
        devDependencies: {
        },
    })
    
    generator.extendPackage({
        browserslist: [
            '> 1%',
            'last 2 versions',
            'not dead',
        ],
    })
}
