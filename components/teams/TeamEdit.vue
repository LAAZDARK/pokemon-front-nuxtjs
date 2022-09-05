<template>
  <div>
    <a-button type="primary" @click="showModal">Editar</a-button>
    <a-modal v-model:visible="visible" title="Nombre" :confirm-loading="confirmLoading" @ok="handleOk">
      <a-input class="mb-5" v-model="props.team.name" placeholder="Nombre del equipo" />
      <div></div>
      <a-select mode="multiple" v-model="props.team.pokemons" :defaultValue="[props.team.pokemons]" style="width: 100%"
        placeholder="Seleccionar pokemon">
        <a-select-option v-for="pokemon in pokemons" :key="pokemon.no">{{pokemon.name}}</a-select-option>
      </a-select>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
import { updateTeam } from '@/api/teamService'
import { getPokemons } from '@/api/pokemonService'

interface Props {
  team: {
    _id: String,
    name: String,
    pokemons: [],
  }
}

interface Pokemons {
    name: String,
    no: Number,
};

const props = defineProps<Props>();
const visible = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);
  const pokemons = ref<Pokemons>()

onMounted(() => {
  handlePokemons()
})

const showModal = () => {
  visible.value = true;
};

const handleOk = () => {
      confirmLoading.value = true;
      updateTeam(props.team).then(response => {
        visible.value = false;
        confirmLoading.value = false;
        console.log(response)
      }).catch(error => {
        confirmLoading.value = false;
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

