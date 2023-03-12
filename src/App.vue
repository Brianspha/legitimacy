<template>
  <!-- App.vue -->

  <v-app>

    <v-app-bar app>
      <!-- -->
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
       
      </v-container>
      <v-overlay
      v-model="$store.state.isLoading"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="black"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    </v-main>
    <BottomNavigation></BottomNavigation>
  </v-app>
</template>

<script>
import BottomNavigation from './components/navigation/BottomNavigation.vue';
export default {
  name: "App",

  components: {BottomNavigation},

  data: () => ({
    //
  }),
};
</script>
