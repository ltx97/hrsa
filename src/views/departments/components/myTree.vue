<template>
  <el-row type="flex" justify="space-between" style="height: 40px; width: 100%;" align="middle">
    <el-col>
      <span class="company-name">{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>
          <span>{{ treeNode.manager }}</span>
        </el-col>
        <el-col>
          <el-dropdown @command="handleCommand">
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
                <el-dropdown-item v-if="!isRoot" command="delete">删除部门</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import { deleteById } from '@/api/department'
export default {
  name: 'MyTree',
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  methods: {
    async handleCommand(type) {
      if (type === 'delete') {
        deleteById(this.treeNode.id)
        this.$emit('complete')
      } else if (type === 'add') {
        this.$emit('showAdd', 'add', this.treeNode)
      } else if (type === 'edit') {
        this.$emit('showAdd', 'edit', this.treeNode)
      }
    }
  }
}
</script>
<style>
.company-name{
  font-size: 14px;
}
</style>
