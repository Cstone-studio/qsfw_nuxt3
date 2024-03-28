<template>
  <div>
    <!-- <CommonTagsView title="User" /> -->
    <CommonContentContainer>
      <template #content>
        <UserSearch ref="userSearch" />
      </template>
    </CommonContentContainer>
    <CommonContentContainer>
      <template #content>
        <UserBtnGroup ref="userBtnGroup" />
      </template>
    </CommonContentContainer>
    <CommonContentContainer>
      <template #content>
        <UserTable ref="userTable" :search-form="{}" />
      </template>
    </CommonContentContainer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});

const data = reactive({});
</script>
