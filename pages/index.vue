<template>
  <!-- <Tutorial /> -->
  <LayoutMain />
</template>

<script lang="ts">
import Vue from 'vue'
import { getUser } from '@/api/authService'
import LayoutMain from '../components/LayoutMain.vue'

export default Vue.extend({
  middleware: 'auth',
  name: "IndexPage",
  data() {
    return {
      message: ""
    };
  },
  async mounted() {
    try {
      const response = await getUser();
      console.log(response);
    }
    catch (e) {
      this.message = "You are not logged in";
      this.$nuxt.$emit("auth", false);
    }
  },
  components: { LayoutMain }
})
</script>
