<template>
  <div>
    <ElITable
      :table-data="userStore.users"
      :total="userStore.totalElements"
      :current-page="userStore.pageNumber"
      :page-size="userStore.pageSize"
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
            confirm-button-text="Yes"
            cancel-button-text="No"
            icon-color="#626AEF"
            title="Are you sure to delete this?"
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
    { prop: "id", lable: "id" },
    { prop: "email", lable: "email" },
    { prop: "password", lable: "password" },
    { prop: "userName", lable: "userName" },
    { prop: "mobile", lable: "mobile" },
    { prop: "role", lable: "role" },
    { prop: "token", lable: "token" },
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
  userStore.pageNumber = value;
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
