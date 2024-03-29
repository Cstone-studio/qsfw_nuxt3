import { defineStore } from "pinia";
import { resetForm } from "~/composables/resetForm";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    users: [] as User[],
    totalElements: 0,
    page: 1,
    rows: 10,
    params: {
      email: "",
      password: "",
      userName: "",
      mobile: "",
      role: "",
      token: "",
    },
    userDetail: {} as User,
  }),

  actions: {
    async getUsers(params?: {
      keywords: string,
    }) {
      if (params !== undefined) this.params = params;
      const { data: result } = await useQsRequest.get("/api/user", {
        ...this.params,
        page: this.page,
        rows: this.rows,
      });

      this.users = (result as Ref<CommonListsResp>).value.result.records;
      this.totalElements = (
        result as Ref<CommonListsResp>
      ).value.result.total;
    },

    async addUser(params: {
      email: string;
      password: string;
      userName: string;
      mobile: string;
      role: string;
      token: string;
    }) {
      await useQsRequest.post("/api/user", {
        ...params,
      });
    },

    async getUserDetail(id: number) {
      const { data } = await useQsRequest.get("/api/user/detail", {
        id,
      });
      this.userDetail = (data as Ref<CommonResp<User>>).value.result;
    },

    async editUser(params: {
      email: string;
      password: string;
      userName: string;
      mobile: string;
      role: string;
      token: string;
    }) {
      await useQsRequest.put("/api/user", {
        ...params,
      });
    },

    async deleteUser(id: number) {
      await useQsRequest.delete("/api/user", {
        id,
      });
    },

    resetParams() {
      resetForm(this.params);
      this.page = 1;
    },
  },
});
interface User {
  id: number;
  email: string;
  password: string;
  userName: string;
  mobile: string;
  role: string;
  token: string;
}
