<template>
  <v-bottom-navigation :value="value" grow>
    <v-btn
      v-for="(icon, index) in navigators"
      :key="index"
      :to="icon.to"
      @click="value = index"
    >
      <span>{{ icon.title }}</span>

      <v-icon>{{ icon.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script>
export default {
  data: () => {
    return {
      value: 0,
      navigators: [
        {
          to: "/",
          title: "History",
          icon: "mdi-folder",
        },
        {
          to: "/add",
          title: "Mint",
          icon: "mdi-history",
        },
      ],
    };
  },
};
</script>
