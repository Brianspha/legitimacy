<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog
        transition="dialog-bottom-transition"
        max-width="600"
        height="600"
        v-model="$store.state.showModal"
      >
        <template>
          <v-card>
            <v-toolbar flat>Qualification details</v-toolbar>
            <v-card-text>
              <div class="text-h6">Institution</div>
              <div class="text-h7">
                {{ $store.state.qualification.name }}
              </div>
              <div class="text-h6">Year</div>
              <div class="text-h7">
                {{ $store.state.qualification.year }}
              </div>
              <div class="text-h6">Type</div>
              <div class="text-h7">
                {{ $store.state.qualification.type.toUpperCase() }}
              </div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn text @click="$store.state.showModal = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>

<style></style>
