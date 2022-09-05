<template>
  <div>
    <TeamCreate @change="handleTeams"></TeamCreate>
    <a-table :columns="columns" :dataSource="dataList" rowKey="_id" size="small">
      <template v-for="col in ['name', 'updatedAt', 'createdAt']" :slot="col" slot-scope="text, record, index">
        <div>
          {{text}}
        </div>
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <div class='editable-row-operations'>
          <a-row type="flex" justify="space-around">
            <a-col :span="4">
              <TeamEdit :team="record" />
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
import { getTeams, deleteTeam } from '@/api/teamService'
// import { getPokemons } from '@/api/pokemonService'
import TeamEdit from './TeamEdit.vue'
import TeamCreate from './TeamCreate.vue'
const columns = [{
  title: 'Nombre',
  dataIndex: 'name',
  // width: '25%',
  scopedSlots: { customRender: 'name' },
}, {
  title: 'Registro',
  dataIndex: 'createdAt',
  // width: '15%',
  scopedSlots: { customRender: 'createdAt' },
}, {
  title: 'Actualizado',
  dataIndex: 'updatedAt',
  // width: '40%',
  scopedSlots: { customRender: 'updatedAt' },
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
            // pokemons: null,
        };
    },
    mounted() {
      this.handleTeams()
      // this.handlePokemons()
    },
    methods: {
      async handleTeams() {
        await getTeams().then(response => {
          this.dataList = response.data
        }).catch(error => {
          console.error(error)
        })
      },
      // async handlePokemons() {
      //   await getPokemons().then(response => {
      //     this.pokemons = response.data
      //     console.log(pokemons);
      //   }).catch(error => {
      //     console.log(error)
      //   })
      // },
      async handleDelete(id) {
        await deleteTeam(id).then(response => {
          console.log(response)
        }).catch(error => {
          console.error(error)
        })
      },
    },
    components: { TeamEdit, TeamCreate }
}
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
