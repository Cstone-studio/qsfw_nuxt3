<template>
  <el-form ref="form" :inline="true" :model="data.form">
    <div style="display: flex">
      <div style="flex: 1">
        <el-form-item label="关键字">
          <el-input
            v-model="data.form.keywords"
            style="width: 300px"
                          placeholder="账号/密码/昵称/电话号/角色/登录token"
            clearable></el-input>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="default" style="margin-bottom: 0px" @click="onSubmit"
          >查询
        </el-button>
        <el-button type="info" style="margin-bottom: 0px" @click="reset"
          >重置
        </el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script setup lang="ts">
const data = reactive({
  form: {
   keywords:'',
  }
});

const userStore = useUserStore();

onMounted(() => {});

const onSubmit = (e: MouseEvent) => {
  userStore.getUsers(data.form);
}

const reset = () => {
  userStore.resetParams();
  userStore.getUsers();
};
</script>

<style lang="scss" scoped>
@import "~/assets/sass/el/searchForm.scss";
</style>
