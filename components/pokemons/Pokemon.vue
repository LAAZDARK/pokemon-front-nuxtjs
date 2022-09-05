<template>
  <div>
    <a-table :columns="columns" :dataSource="dataList" rowKey="_id" size="small">
      <template v-for="col in ['name', 'updatedAt', 'createdAt']" :slot="col" slot-scope="text, record, index">
        <div>
          {{text}}
        </div>
      </template>
      <template slot="abilities" slot-scope="abilities">
        <span v-for="a in abilities" :key="a.slot">
          | {{a.ability.name}}

        </span>
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <div class='editable-row-operations'>
          <a-row type="flex" justify="space-around">
            <a-col :span="4">
              <PokemonEdit :pokemon="record" />
            </a-col>
            <a-col :span="4">
              <a-button class="float-left" type="danger" @click="handleDelete(record._id)">Eliminar</a-button>
            </a-col>
          </a-row>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
import { getPokemons, deletePokemon } from '@/api/pokemonService'
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

export default {
    data() {
        return {
            columns,
            dataList: null,
        };
    },
    mounted() {
      this.handlePokemons()
    },
    methods: {
      async handlePokemons() {
        await getPokemons().then(response => {
          this.dataList = response.data
        }).catch(error => {
          console.error(error)
        })
      },
      async handleDelete(id) {
        await deletePokemon(id).then(() => {
        }).catch(error => {
          console.error(error)
        })
      },
    },
    components: { PokemonEdit }
}
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
