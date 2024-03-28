import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    users: [] as User[],
    totalElements: 0,
    pageNumber: 1,
    pageSize: 20,
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
      email: string;
      password: string;
      userName: string;
      mobile: string;
      role: string;
      token: string;
    }) {
      if (params !== undefined) this.params = params;
      const { data: result } = await useQsRequest.get("/api/user", {
        ...this.params,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
      });

      this.users = (result as Ref<CommonListsResp>).value.result.content;
      this.totalElements = (
        result as Ref<CommonListsResp>
      ).value.result.totalElements;
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
