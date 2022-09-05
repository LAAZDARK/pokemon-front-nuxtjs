<template>
  <div>
    <TeamCreate @change="handleTeams"></TeamCreate>
    <a-table :columns="columns" :dataSource="dataList" rowKey="_id" :scroll="{ x: 1200 }" size="small">
      <template v-for="col in ['name', 'updatedAt', 'createdAt']" :slot="col" slot-scope="text, record, index">
        <div>
          {{ text }}
        </div>
      </template>
      <template slot="createdAt" slot-scope="createdAt">
        <span>{{ createdAt | formatDateTime }}</span>
      </template>
      <template slot="updatedAt" slot-scope="updatedAt">
        <span>{{ updatedAt | formatDateTime }}</span>
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <div class='editable-row-operations'>
          <div class="flex items-center">
            <TeamEdit @change="handleTeams" :team="record" />
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
import { getTeams, deleteTeam } from '@/api/teamService'
import TeamEdit from './TeamEdit.vue'
import TeamCreate from './TeamCreate.vue'
const columns = [{
  title: 'Nombre',
  dataIndex: 'name',
  scopedSlots: { customRender: 'name' },
  responsive: ["sm"]
}, {
  title: 'Registro',
  dataIndex: 'createdAt',
  scopedSlots: { customRender: 'createdAt' },
  responsive: ["sm"]
}, {
  title: 'Actualizado',
  dataIndex: 'updatedAt',
  scopedSlots: { customRender: 'updatedAt' },
  responsive: ["sm"]
}, {
  title: 'Acción',
  dataIndex: 'operation',
  // width: '25%',
  scopedSlots: { customRender: 'operation' },
  responsive: ["sm"]
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
