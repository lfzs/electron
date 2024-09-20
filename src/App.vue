<template>
<span @click="() => console.info('click')">{{ app }}</span>
</template>
<script setup>
import axios from 'axios'
console.info(import.meta.env)
const app = 'APP'

axios.get('https://scrm.jianzhiweike.net/admin/common-permission/getPermissionByAcl')
</script>
