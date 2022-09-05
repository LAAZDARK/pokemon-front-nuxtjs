<template>
  <div>
    <TeamCreate @change="handleTeams"></TeamCreate>
    <a-table :columns="columns" :dataSource="dataList" rowKey="_id" size="small">
      <template v-for="col in ['name', 'updatedAt', 'createdAt']" :slot="col" slot-scope="text, record, index">
        <div>
          {{ text }}
        </div>
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <div class='editable-row-operations'>
          <a-row type="flex" justify="space-around">
            <a-col :span="4">
              <TeamEdit @change="handleTeams" :team="record" />
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
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getTeams, deleteTeam } from '@/api/teamService'
import TeamEdit from './TeamEdit.vue'
import TeamCreate from './TeamCreate.vue'
const columns = [{
  title: 'Nombre',
  dataIndex: 'name',
  scopedSlots: { customRender: 'name' },
}, {
  title: 'Registro',
  dataIndex: 'createdAt',
  scopedSlots: { customRender: 'createdAt' },
}, {
  title: 'Actualizado',
  dataIndex: 'updatedAt',
  scopedSlots: { customRender: 'updatedAt' },
}, {
  title: 'Acción',
  dataIndex: 'operation',
  width: '25%',
  scopedSlots: { customRender: 'operation' },
}]

interface Teams {
  name: String,
  pokemons: [],
};

const dataList = ref<Teams>()

onMounted(() => {
  handleTeams()
})

const handleTeams = async () => {
  await getTeams().then(response => {
    dataList.value = response.data
  }).catch(error => {
    console.error(error)
  })
};
const handleDelete = async (id: string) => {
  await deleteTeam(id).then(async () => {
    await handleTeams()
  }).catch(error => {
    console.error(error)
  })
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
