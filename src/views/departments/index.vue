<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <my-tree
          :tree-node="center"
          :is-root="true"
          @complete="queryAllDepart"
          @showAdd="showAddFn"
        />
      </el-card>
      <el-tree
        :default-expand-all="true"
        :data="departs"
        :props="defaultProps"
      >
        <template #default="{ data }">
          <my-tree
            :tree-node="data"
            @complete="queryAllDepart"
            @showAdd="showAddFn"
          />
        </template>
      </el-tree>
      <add-depart
        :dialog-visible.sync="showAdd"
        :type="type"
        :current-node="currentNode"
        @complete="queryAllDepart"
      />
    </div>
  </div>
</template>
<script>
import myTree from './components/myTree.vue'
import addDepart from './components/addDepart.vue'
import { queryAll } from '@/api/department'

export default {
  components: {
    myTree,
    addDepart
  },
  data() {
    return {
      departs: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      center: {
        name: '',
        manager: ''
      },
      showAdd: false,
      currentNode: {},
      type: true
    }
  },
  mounted() {
    this.queryAllDepart()
  },
  methods: {
    showAddFn(type, currentNode) {
      if (type === 'add') {
        this.type = true
      } else if (type === 'edit') {
        this.type = false
      }
      this.currentNode = currentNode
      this.showAdd = true
    },
    async queryAllDepart() {
      const result = await queryAll()
      this.center.id = result.id
      this.center.name = result.name
      this.center.manager = result.manager
      this.departs = result.children.filter((el, idx, array) => {
        for (const item of array) {
          if (el.pid === item.id) {
            item.children.push(el)
            return false
          }
        }
        return true
      })
    }
  }
}
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
