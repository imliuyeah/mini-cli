module.exports = (generator) => {
    generator.render('./template')

    generator.extendPackage({
        dependencies: {
            axios: '^1.4.0',
        },
    })
}
