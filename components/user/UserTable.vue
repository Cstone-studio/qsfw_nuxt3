<template>
  <div>
    <ElITable
      :table-data="userStore.users"
      :total="userStore.totalElements"
      :current-page="userStore.page"
      :page-size="userStore.rows"
      :label-list="data.tableLabel"
      :table-loading="data.loading"
      :pagination="data.pagination"
      :selection="data.selection"
      table-max-height="70vh"
      table-height="70vh"
      @row-dblclick="goToDetail"
      @current-change="handleCurrentChange"
    >
      <el-table-column width="200px">
        <template #default="scope">
          <el-button @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >

          <el-popconfirm
            confirm-button-text="是"
            cancel-button-text="否"
            icon-color="#626AEF"
            title="确定要删除吗?"
            @confirm="handleDelete(scope.$index, scope.row)"
          >
            <template #reference>
              <el-button type="danger">Delete</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </ElITable>
    <UserEdit ref="editDialogRef" />
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from "element-plus";

const data = reactive({
  tableLabel: [
    { prop: "id", label: "ID" },
    { prop: "email", label: "账号" },
    { prop: "password", label: "密码" },
    { prop: "userName", label: "昵称" },
    { prop: "mobile", label: "电话号" },
    { prop: "role", label: "角色" },
    { prop: "token", label: "登录token" },
  ],
  loading: true,
  selection: false,
  pagination: true,
});

const editDialogRef = ref<FormInstance>();

const userStore = useUserStore();

onMounted(async () => {
  await userStore.getUsers();
  data.loading = false;
});

// @ts-ignore
function goToDetail(row) {}

function handleCurrentChange(value: number) {
  userStore.page = value;
  userStore.getUsers();
}

const handleEdit = (index: number, row: User) => {
  // @ts-ignore
  editDialogRef.value?.openDialog(row);
};

const handleDelete = async (index: number, row: User) => {
  await userStore.deleteUser(row.id);
  userStore.getUsers();
};
</script>

<style></style>
