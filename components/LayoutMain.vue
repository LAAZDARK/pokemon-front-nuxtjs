<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <i class="las la-hippo"></i>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <a-icon type="team" />
          <span>Equipos</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="qq" />
          <span>Pokemons</span>
        </a-menu-item>
        <a-menu-item key="3" @click="$auth.logout(), $router.push('/login')">
          <a-icon type="poweroff" />
          <span>Cerrar sessión</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <div class="ml-3 float-left">
          <a-icon size="large" class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => collapsed = !collapsed" />
        </div>
        <div class="flex items-center float-right mr-11">
          <div>
            <strong class="mr-4">{{ user.name }}</strong>
          </div>
          <img class="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="@/static/assets/image/avatar.jpg">
        </div>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '655px' }">
        <div v-if="selectedKeys == 1">
          <Team></Team>
        </div>
        <div v-if="selectedKeys == 2">
          <Pokemon></Pokemon>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { getUser } from '@/api/authService'
import Team from './teams/Team.vue';
import Pokemon from './pokemons/Pokemon.vue';


const selectedKeys = ref<string[]>(['1']);
const collapsed = ref<boolean>(false);

interface User {
  name: string,
  email: string,
}

const user = ref<User>({ name: '', email: '' });

onMounted(() => {
  handleUser()
})

const handleUser = async () => {
  await getUser().then(response => {
    user.value = response.data
  }).catch(error => {
    console.error(error)
  })
};


</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
