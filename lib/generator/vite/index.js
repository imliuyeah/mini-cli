module.exports = (generator) => {
    generator.render('./template')

    generator.extendPackage({
        dependencies: {
        },
        devDependencies: {
            "@vitejs/plugin-vue": "^5.0.4",
            vite: "^5.1.4"
        }
    })
    

    generator.extendPackage({
        type: 'module',
        scripts: {
            dev: 'vite',
            build: 'vite build'
        }
    })
}
