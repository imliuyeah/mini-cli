module.exports = (generator, options = {}) => {
    generator.injectImports(generator.entryFile, `import router from './router'`)

    generator.injectPlugins(generator.entryFile, `router`)

    generator.extendPackage({
        dependencies: {
            'vue-router': '^4',
        },
    })

    generator.render('./template', {
        historyMode: options.historyMode,
        hasTypeScript: false,
        plugins: [],
    })
}
