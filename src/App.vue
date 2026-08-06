<script setup lang="ts">
</script>

<template>
  <el-container class="h-screen">
    <el-header class="!p-0">
      <el-menu mode="horizontal" :router="true" :default-active="$route.path">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/map">地图</el-menu-item>
        <el-menu-item index="/about">关于</el-menu-item>
      </el-menu>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>
