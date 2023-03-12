<template>
  <v-card flat>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="$store.state.userAddress"
        label="Address"
        color="black"
        readonly
      ></v-text-field>
      <v-text-field
        v-model="name"
        :counter="10"
        :rules="nameRules"
        label="Qualification Name"
        color="black"
        required
      ></v-text-field>

      <v-text-field
        v-model="year"
        :rules="yearRules"
        label="Year"
        color="black"
        required
      ></v-text-field>

      <v-select
        v-model="select"
        :items="qTypes"
        :rules="[(v) => !!v || 'Qualification Type is required']"
        label="Qualification Type"
        color="black"
        required
      ></v-select>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="mint"> Mint Qualification </v-btn></v-card-actions
      >
    </v-form>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length >= 5) || "Name must be less than 10 characters",
    ],
    year: "",
    yearRules: [
      (v) => !!v || "Year is required",
      (v) => (v && !isNaN(v) && v>=1900) || "Year must be positive or valid number",
    ],
    qType: "",
    qTypes: [
      "Pre-Primary",
      "Primary",
      "Secondary",
      "Bachelors",
      "Masters",
      "PHD",
      "Post-PHD",
      "Certificate",
    ],
  }),
  methods: {
    mint() {},
  },
};
</script>

<style></style>
