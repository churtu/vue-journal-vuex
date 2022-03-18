<template>
  <div class="entry-list-container">
      <div class="px-2 pt-2">
          <input v-model="term" type="text" class="form-control" placeholder="Buscar entrada">
      </div>
      <div class="mt-2 d-flex flex-column">
          <button @click="$router.push({name: 'entry', params: {id: 'new'}})" class="btn btn-primary mx-3">Nueva entrada <i class="fa fa-plus-circle"></i></button>
      </div>
      <div class="entry-scrollarea">
          <entry
          v-for="entry in entriesbyTerm" :key="entry.id"
          :entry="entry"
          />

      </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex'

export default {
    components:{
        Entry: defineAsyncComponent(() => import('../components/Entry'))
    },
    computed: {
        ...mapGetters('journal', ['getEntriesByTerm']),
        entriesbyTerm(){
            return this.getEntriesByTerm( this.term )
        }
    },
    data(){
        return{
            term: ''
        }
    }
}
</script>

<style lang="scss" scoped>
    .entry-list-container{
        border-right: 1px solid #2c3e50;
        height: calc(100vh - 56px);
    }

    .entry-scrollarea{
        height: calc(100vh - 110px);
        overflow: auto;
    }
</style>