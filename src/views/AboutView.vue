<script setup lang="ts">
</script>

<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-4">关于</h1>
    <p class="text-gray-600 mb-6">数智运维系统 - 基于 ArcGIS 的智能运维平台</p>

    <el-card>
      <template #header>
        <span class="font-bold">技术栈</span>
      </template>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="框架">Vue 3</el-descriptions-item>
        <el-descriptions-item label="构建工具">Vite</el-descriptions-item>
        <el-descriptions-item label="UI 库">Element Plus</el-descriptions-item>
        <el-descriptions-item label="状态管理">Pinia</el-descriptions-item>
        <el-descriptions-item label="路由">Vue Router</el-descriptions-item>
        <el-descriptions-item label="CSS">Tailwind CSS</el-descriptions-item>
        <el-descriptions-item label="GIS">ArcGIS Core API</el-descriptions-item>
        <el-descriptions-item label="测试">Playwright</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>
