module.exports = (generator) => {
    generator.injectImports(generator.entryFile, `import store from './store'`)

    generator.injectPlugins(generator.entryFile, `store`)

    generator.extendPackage({
        dependencies: {
            pinia: '^2.0.17',
        },
    })

    generator.render('./template', {})
}
