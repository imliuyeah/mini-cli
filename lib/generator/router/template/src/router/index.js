import { createRouter<%
  if (historyMode) {
    %>, createWebHistory<%
  } else {
    %>, createWebHashHistory<%
  }

  if (hasTypeScript) {
    %>, RouteRecordRaw<%
  }
  %> } from 'vue-router'


const router = createRouter({
  <%_ if (historyMode) { _%>
  history: createWebHistory(process.env.BASE_URL),
  <%_ } else { _%>
  history: createWebHashHistory(),
  <%_ } _%>
  routes: []
})

export default router