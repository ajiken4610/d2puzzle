<template lang="pug">
h1 hello
</template>

<script setup lang="ts">
import { PuzzleData } from "~~/utils/PuzzleData";

defineProps<{ data: PuzzleData }>();

</script>
