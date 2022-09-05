<template>
  <div>
    <a-button type="primary" @click="showModal">Editar</a-button>
    <a-modal v-model:visible="visible" title="Nombre" :confirm-loading="confirmLoading" @ok="handleOk">
      <label for="">Nombre</label>
      <a-input class="mb-5" v-model="props.pokemon.name" placeholder="Nombre" />
      <label for="">Peso</label>
      <a-input class="mb-5" v-model="props.pokemon.weight" placeholder="Peso" />
      <label for="">Alto</label>
      <a-input class="mb-5" v-model="props.pokemon.height" placeholder="Alto" />
      <div>
        <b for="">Habilidades:</b><br>
        <span v-for=" ability in props.pokemon.abilities" :key="ability.slot">
          - <label for="">{{ ability.ability.name }}</label><br>
        </span>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { updatePokemon } from '@/api/pokemonService'

interface Props {
  pokemon: {
    _id: String,
    name: String,
    weight: number,
    height: number,
  }
}


const props = defineProps<Props>();


const visible = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);

const emit = defineEmits(['change'])

const showModal = () => {
  visible.value = true;
};

const handleOk = () => {
  confirmLoading.value = true;
  updatePokemon(props.pokemon).then(() => {
    visible.value = false;
    confirmLoading.value = false;
    emit('change')
  }).catch(error => {
    confirmLoading.value = false;
    console.error(error)
  })
};

</script>

