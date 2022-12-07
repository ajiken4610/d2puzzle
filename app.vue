<template lang="pug">
div
  PuzzleView(:data="data")
</template>

<script setup lang="ts">
const data = new PuzzleData(2, 2)
data.setRowNumberAt([1], 0, 0)
data.setRowNumberAt([1], 0, 1)
data.setRowNumberAt([2], 1, 0)
data.setRowNumberAt([0], 1, 1)
//for (const row of data.getRows(1)) {
//  console.log(row)
//}
console.log(data)
</script>
