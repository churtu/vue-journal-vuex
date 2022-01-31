<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <button @click="goToDaybook" class="btn-primary btn">Daybook</button>
  <button class="btn-secondary btn">action</button>
  <button class="btn-info btn">action</button>
  <button class="btn-warning btn">action</button>
  <button class="btn-danger btn">action</button>
  <button class="btn-dark btn">action</button>
  </div>
</template> 
<script>
export default {
  methods:{
    goToDaybook() {
    this.$router.push({name:'no-entry'})
  },
  }
}
</script>