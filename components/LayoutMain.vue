<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" />
      <i class="las la-hippo"></i>
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <i class="las la-user-friends"></i>
          <span>Equipos</span>
        </a-menu-item>
        <a-menu-item key="2">
          <i class="las la-hippo"></i>
          <span>Pokemons</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
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
import { ref } from 'vue';
import Team from './teams/Team.vue';
import Pokemon from './pokemons/Pokemon.vue';


const selectedKeys = ref<string[]>(['1']);
const collapsed = ref<boolean>(false);


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
