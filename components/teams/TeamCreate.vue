<template>
  <div>
    <div class="flex justify-end">
      <a-button class="mb-5" type="primary" @click="showModal">Agregar</a-button>
    </div>
    <a-modal v-model:visible="visible" title="Nombre" :confirm-loading="confirmLoading" @ok="handleOk" okText="Crear"
      cancelText="Cancelar">
      <a-input class="mb-5" v-model="teams.name" placeholder="Nombre del equipo" />
      <div class="w-100"></div>
      <a-select mode="multiple" v-model="teams.pokemons" :defaultValue="[]" style="width: 100%"
        placeholder="Seleccionar pokemon">
        <a-select-option v-for="pokemon in pokemons" :key="pokemon.no">{{ pokemon.name }}</a-select-option>
      </a-select>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { storeTeam } from '@/api/teamService'
import { getPokemons } from '@/api/pokemonService'

interface Pokemons {
  name: String,
  no: Number,
};

interface Teams {
  name: String,
  pokemons: [],
};


const name = ref<string>('');
const visible = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);

const teams = ref<Teams>({ name: '', pokemons: [] })
const pokemons = ref<Pokemons>()
const emit = defineEmits(['change'])

onMounted(() => {
  handlePokemons()
})

const showModal = () => {
  visible.value = true;
};

const handleOk = () => {
  confirmLoading.value = true;
  storeTeam(teams.value).then(() => {
    visible.value = false;
    confirmLoading.value = false;
    teams.value = { name: '', pokemons: [] };
    emit('change')
  }).catch(error => {
    console.error(error)
  })
};

const handlePokemons = async () => {
  await getPokemons().then(response => {
    pokemons.value = response.data
    console.log(pokemons.value);
  }).catch(error => {
    console.log(error)
  })
};


</script>

