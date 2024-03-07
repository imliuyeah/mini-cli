// // https://github.com/facebook/jscodeshift
// vue 插件注入，用于 app.use 方法
module.exports = function injectPlugins(fileInfo, api, { injections }) {
    const j = api.jscodeshift
    const root = j(fileInfo.source)

    // 创建一个函数，将传入的代码字符串转换为一个 ExpressionStatement AST 节点
    const toExpressionStatementAST = i => j.expressionStatement(
        j.callExpression(
            j.memberExpression(j.identifier('app'), j.identifier('use')), [j.identifier(i)],
        ),
    )

    root.find(j.VariableDeclarator)
    .filter(path => path.value.id.name === 'app' && path.value.init.callee.name === 'createApp')
    .forEach(path => {
        // 对于每个注入，创建一个对应的 ExpressionStatement 并插入
        injections.forEach(injection => {
            const expressionStatementAST = toExpressionStatementAST(injection)
            // 使用 Statement 方法找到当前路径的 Statement 节点，然后在其后插入
            j(path).closest(j.Statement).insertAfter(expressionStatementAST)
        })
    })

    return root.toSource({ quote: 'single' })
}