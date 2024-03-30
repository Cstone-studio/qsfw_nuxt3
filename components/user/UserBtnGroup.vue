<template>
  <div>
    <el-button type="success" plain @click="data.dialogFormVisible = true" size="small"
      >Add</el-button
    >
  </div>
  <el-dialog v-model="data.dialogFormVisible" title="Add User" width="500">
    <el-form ref="formRef" :model="data.form" :rules="formRules">
      <el-form-item
        label="email"
        :label-width="data.formLabelWidth"
        prop="email"
      >
        <el-input v-model="data.form.email" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="password"
        :label-width="data.formLabelWidth"
        prop="password"
      >
        <el-input v-model="data.form.password" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="userName"
        :label-width="data.formLabelWidth"
        prop="userName"
      >
        <el-input v-model="data.form.userName" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="mobile"
        :label-width="data.formLabelWidth"
        prop="mobile"
      >
        <el-input v-model="data.form.mobile" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="role"
        :label-width="data.formLabelWidth"
        prop="role"
      >
        <el-input v-model="data.form.role" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="token"
        :label-width="data.formLabelWidth"
        prop="token"
      >
        <el-input v-model="data.form.token" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="data.dialogFormVisible = false">Cancel</el-button>
        <el-button
          :loading="data.addBtnLoading"
          type="primary"
          @click.prevent="addUser(formRef)"
        >
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import type { FormInstance } from "element-plus";
import { resetForm } from "~/composables/resetForm";

const data = reactive({
  dialogFormVisible: false,
  addBtnLoading: false,
  formLabelWidth: "140px",
  form: {
    email: "",
    password: "",
    userName: "",
    mobile: "",
    role: "",
    token: "",
  },
});

const formRules = {
  email: [
    { required: true, trigger: "blur", message: "email cannot be empty" },
  ],
  password: [
    { required: true, trigger: "blur", message: "password cannot be empty" },
  ],
  userName: [
    { required: true, trigger: "blur", message: "userName cannot be empty" },
  ],
  mobile: [
    { required: true, trigger: "blur", message: "mobile cannot be empty" },
  ],
  role: [
    { required: true, trigger: "blur", message: "role cannot be empty" },
  ],
  token: [
    { required: true, trigger: "blur", message: "token cannot be empty" },
  ],
};

const formRef = ref<FormInstance>();

const userStore = useUserStore();

async function addUser(formRef: FormInstance | undefined) {
  if (!formRef) return;
  await formRef.validate(async (valid, fields) => {
    if (valid) {
      try {
        data.addBtnLoading = true;
        await userStore.addUser(data.form);
        data.addBtnLoading = false;
        ElNotification({
          title: "Success",
          message: "Save successfully",
          type: "success",
        });
        data.dialogFormVisible = false;
        resetForm(data.form);
      } catch (error) {
        console.log("exception occur:", error);
      }
    }
  });
}
</script>
