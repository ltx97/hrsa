<template>
  <el-dialog
    :visible.sync="dialogVisible"
    :title="title"
    width="500"
    :before-close="handleClose"
    @open="open"
  >
    <el-form ref="myform" :model="form" :rules="rules" label-width="auto" style="max-width: 600px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编号" prop="code">
        <el-input v-model="form.code" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select
          v-model="form.manager"
          placeholder="请选择"
          @focus="handleOpen"
        >
          <el-option
            v-for="(item, idx) in employees"
            :key="idx"
            :label="item.name"
            :value="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍">
        <el-input
          v-model="form.introduce"
          type="textarea"
          placeholder="1-300个字符"
          :rows="4"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="onSubmit">
          确定
        </el-button>
        <el-button @click="handleClose">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import { queryAll, updateDepart, addDepart } from '@/api/department'
import { Message } from 'element-ui'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: true
    },
    currentNode: {
      type: Object,
      default: () => {}
    },
    type: {
      type: Boolean,
      default: true
    }
  },
  data() {
    const validName = async function(obj, val, c) {
      console.log(this.form)
      const allDepart = await queryAll()
      const hasMatch = allDepart.children.filter((el, idx, arr) => {
        if (!this.type) {
          return el.pid === this.form.pid && el.id !== this.form.id
        } else {
          return el.pid === this.form.pid
        }
      }).some((el) => {
        return el.name === val
      })
      if (hasMatch) {
        c(new Error('当前部门下有重名了'))
      } else {
        c()
      }
    }.bind(this)
    return {
      form: {
        name: '',
        code: '',
        manager: '',
        introduce: '',
        pid: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入东西', trigger: 'blur' },
          { min: 1, max: 50, message: '长度为1-50', trigger: 'blur' },
          { validator: validName, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入东西', trigger: 'blur' },
          { min: 1, max: 50, message: '长度为1-50', trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '请输入东西', trigger: 'blur' }
        ],
        introduce: [
          { min: 1, max: 300, message: '长度为1-300', trigger: 'blur' }
        ]
      },
      employees: [
        {
          name: '张三'
        },
        {
          name: '李四'
        },
        {
          name: '王五'
        }
      ]
    }
  },
  computed: {
    title() {
      if (this.type) {
        return '新增部门'
      } else {
        return '编辑部门'
      }
    }
  },
  methods: {
    handleOpen() {
      console.log('打开了')
    },
    open() {
      if (!this.type) {
        this.form = this.currentNode
      } else {
        this.form = {
          name: '',
          code: '',
          manager: '',
          introduce: '',
          pid: this.currentNode.id
        }
      }
    },
    handleClose() {
      this.$refs.myform.resetFields()
      this.form = {
        name: '',
        code: '',
        manager: '',
        introduce: '',
        pid: ''
      }
      this.changeShowAdd()
    },
    changeShowAdd() {
      this.$emit('update:dialogVisible', false)
    },
    async onSubmit() {
      this.$refs.myform.validate((isOK, err) => {
        if (!isOK) {
          console.log(err)
          Message.error(err)
        }
      })
      if (this.type) {
        await addDepart(this.form)
      } else {
        await updateDepart(this.form)
      }
      this.$emit('complete')
      this.changeShowAdd()
    }
  }
}
</script>
<style>
</style>
