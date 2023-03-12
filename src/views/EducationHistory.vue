<template>
  <div id="app">
    <VueFamilyTree :tree="$store.state.history" @card-click="cardClick" />
    <qualification-information></qualification-information>
  </div>
</template>

<script>
import VueFamilyTree from "vue-family-tree";
import QualificationInformation from "../modals/QualificationInformation.vue";

export default {
  components: {
    VueFamilyTree,
    QualificationInformation,
  },
  data: () => ({
    tree: [],
  }),

  methods: {
    generateBlockies(seed) {
      console.log("generating seed: ", this.$props);
      const data = blockies.createDataURL({
        seed: seed
      });
      return data;
    },
    cardClick(item) {
      console.log(item);
      this.$store.state.showModal = true;
      this.$store.state.qualification = item;
    },
  },
};
</script>

<style></style>
