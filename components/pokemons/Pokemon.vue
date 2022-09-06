<template>
  <div>
    <!-- <div class="flex justify-end">
      <a-button class="mb-5" type="primary" :disabled="isLoading" @click="handleSeedPokemons">Cargar pokemon</a-button>
    </div> -->
    <a-table :loading="isLoading" :columns="columns" :dataSource="dataList" rowKey="_id" :scroll="{ x: 1200 }"
      size="small">
      <template v-for="col in ['name', 'updatedAt', 'createdAt']" :slot="col" slot-scope="text, record, index">
        <div>
          {{ text }}
        </div>
      </template>
      <template slot="abilities" slot-scope="abilities">
        <span v-for="a in abilities" :key="a.slot">
          | {{ a.ability.name }}

        </span>
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <div class='editable-row-operations'>
          <div class="flex items-center">
            <PokemonEdit @change="handlePokemons" :pokemon="record" />
            <a-popconfirm title="¿Esta seguro?" okText="Si" cancelText="No" @confirm="handleDelete(record._id)">
              <a-button class="float-left ml-2" type="danger">Eliminar</a-button>
            </a-popconfirm>
          </div>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getPokemons, deletePokemon } from '@/api/pokemonService'
import { seedExecute } from '@/api/seederService'
import PokemonEdit from './PokemonEdit.vue'
const columns = [{
  title: 'Id',
  dataIndex: 'no',
  scopedSlots: { customRender: 'no' },
}, {
  title: 'Nombre',
  dataIndex: 'name',
  scopedSlots: { customRender: 'name' },
}, {
  title: 'Peso',
  dataIndex: 'weight',
  scopedSlots: { customRender: 'weight' },
}, {
  title: 'Alto',
  dataIndex: 'height',
  scopedSlots: { customRender: 'height' },
}, {
  title: 'Habilidades',
  dataIndex: 'abilities',
  scopedSlots: { customRender: 'abilities' },
}, {
  title: 'Acción',
  dataIndex: 'operation',
  width: '25%',
  scopedSlots: { customRender: 'operation' },
}]

onMounted(() => {
  handlePokemons()
})

interface Pokemons {
  name: String,
  no: Number,
};

const dataList = ref<Pokemons>();

const isLoading = ref<boolean>(false);


const handlePokemons = async () => {
  isLoading.value = true
  await getPokemons().then(response => {
    dataList.value = response.data
    isLoading.value = false
  }).catch(error => {
    isLoading.value = false
    console.error(error)
  })
};
const handleDelete = async (id: string) => {
  await deletePokemon(id).then(async () => {
    await handlePokemons()
  }).catch(error => {
    console.error(error)
  })
};

const handleSeedPokemons = async () => {
  isLoading.value = true
  await seedExecute()
  setTimeout(() => {
    handlePokemons()
  }, 15);
  // await getPokemons().then(response => {
  //   dataList.value = response.data
  //   isLoading.value = false
  // }).catch(error => {
  //   isLoading.value = false
  //   console.error(error)
  // })

}

</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
