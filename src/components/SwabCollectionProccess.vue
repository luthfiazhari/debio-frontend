<template>
  <div>
    <v-card class="dg-card" elevation="0" outlined>
      <v-card-title class="px-8" align="center">
        <div class="text-h6">BUCCAL SWAB COLLECTION PROCESS</div>
      </v-card-title>
      <v-container>
        <v-row>
          <!-- <v-col
            v-for="(item, i) in items"
            :key="i"
            cols="12"
          > -->
          <v-col v-for="(item, i) in items" :key="i">
            <v-row>
              <v-card elevation='0'>
                <div class="d-flex">
                  <v-avatar
                    class="ma-3"
                    size="100"
                    tile
                  >
                    <!-- <img :src="image + (i + 1) + png"> -->
                    <img :src="image">
                    <!-- <img :src="item.img"> -->
                    <!-- <img src="@/assets/dnaCollectionSteps/dnaSteps/Collection-Step-7.png"> -->
                  </v-avatar>
                </div>
              </v-card>
            </v-row>
            <v-row>
              <div>
                <v-card-subtitle>{{item.name}}</v-card-subtitle>
              </div>
            </v-row>
          </v-col>
          <!-- </v-col> -->

        </v-row>
        
        
        
      </v-container>
    </v-card>
  </div>
</template>

<script>
import swabSteps from '../assets/json/swabSteps.json'


export default {
  name: "SwabCollectionProccess",
  components: {
  },
  data: () => ({
    items: {},
  }),
  mounted() {
    this.items = swabSteps
  }
}
</script>

<style>

</style>