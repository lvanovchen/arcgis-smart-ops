<script setup lang="ts">
import { useCounterStore } from '../stores/counter'

const counterStore = useCounterStore()
</script>

<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-4">首页</h1>
    <p class="text-gray-600 mb-6">欢迎使用数智运维系统</p>

    <el-card class="mb-6">
      <template #header>
        <span class="font-bold">Pinia 状态管理演示</span>
      </template>
      <div class="flex items-center gap-4">
        <el-button @click="counterStore.decrement()">-</el-button>
        <span class="text-2xl font-mono">{{ counterStore.count }}</span>
        <el-button @click="counterStore.increment()">+</el-button>
        <el-button @click="counterStore.reset()" type="info">重置</el-button>
      </div>
    </el-card>

    <el-card>
      <template #header>
        <span class="font-bold">Element Plus 组件</span>
      </template>
      <el-alert title="这是一个 Alert 组件" type="info" show-icon class="mb-4" />
      <el-tag class="mr-2">标签一</el-tag>
      <el-tag type="success" class="mr-2">标签二</el-tag>
      <el-tag type="warning" class="mr-2">标签三</el-tag>
      <el-tag type="danger">标签四</el-tag>
    </el-card>
  </div>
</template>
