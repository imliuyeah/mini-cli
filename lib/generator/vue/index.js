module.exports = (generator) => {
    generator.render('./template')

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
