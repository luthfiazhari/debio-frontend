<template>
  <div>
    <v-card class="dg-card" elevation="0" outlined>
      <v-card-title class="px-8">
        <div class="text-h6">DNA Sample Collection Steps</div>
      </v-card-title>
      <!-- <div>
        <v-row class="px-8">
          <v-col>
              <v-list-item>
                <v-list-item-avatar
                  tile
                  size="80"
                  src="@/assets/debio-logo.png"
                  <v-img />
                ></v-list-item-avatar>
          
                <v-list-item-content>
                  <v-card-text>
                    Refrain from eating, drinking, chewing gum, brushing teeth, or smoking for at least 60 minutes before sample collection
                  </v-card-text>
                </v-list-item-content>
              </v-list-item>
          </v-col>
        </v-row>
      </div> -->
      <v-container>
        <v-row v-for="(item, i) in items" :key="i">
          <!-- <v-col
            v-for="(item, i) in items"
            :key="i"
            cols="12"
          > -->
          <v-col>
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
                <div>
                  <v-card-subtitle>{{item.img}}</v-card-subtitle>
                </div>
              </div>
            </v-card>
          </v-col>
          <!-- </v-col> -->

        </v-row>
        <div>
          <v-card-subtitle>You do not need to mention your name, address, or any personal information anywhere</v-card-subtitle>

          <v-card-subtitle>You can see the status of your order  here</v-card-subtitle>
        </div>
        
        <div>
          <Button></Button>
        </div>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import dnaSteps from '../assets/json/dnaSteps.json'
// import swabSteps from '../assets/json/swabSteps.json'
import Button from "@/components/Button"


export default {
  name: "DNASampleCollectionSteps",
  components: {
    Button
  },
  data: () => ({
    // image: "https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",
    image: "@/assets/dnaCollectionSteps/dnaSteps/Collection-Step-7.png",
    png: ".png",
    items: [],
    collectionStep: 14,
    swabCollection: 7,
    detail: 'Refrain from eating, drinking, chewing gum, brushing teeth, or smoking for at least 60 minutes before sample collection',
    // descriptions: [
    //   {
    //     detail: 'Refrain from eating, drinking, chewing gum, brushing teeth, or smoking for at least 60 minutes before sample collection'
    //   },
    //   {
    //     detail: 'Rinse your mouth with water. Make sure you swish the water for at least 30 seconds before spitting it out. Repeat. Observe the color. If the water appears colored, repeat rinsing with water until clear'
    //   },
    //   {
    //     detail: 'Wash your hands properly prior to handling envelopes or cotton swabs to avoid contamination'
    //   },
    //   {
    //     detail: 'Put on disposable gloves and wear them throughout the entire collection procedure to protect DNA integrity'
    //   },
    //   {
    //     detail: 'Carefully take a clean cotton swab from the package, grasp only the stem, and pull the swab out. Avoid touching the tips'
    //   },
    // ],
  }),
  mounted() {
    this.items = dnaSteps
  }
}
</script>

<style>

</style>