<template>
  <q-dialog v-model="isOpen" persistent>
    <q-page-container>
      <q-page padding>
        <div class="row">
          <div class="col-12">
            <div v-if="success" class="text-h6">Super !</div>
            <div v-else class="text-h6">Oh oh...</div>
            <q-space />
            <q-btn dense flat icon="close" @click="isOpen = !isOpen">
              <q-tooltip>Close</q-tooltip>
            </q-btn>
          </div>
          <p v-if="success">Registration success</p>
          <p v-else>It's a failure !!</p>
        </div>
      </q-page>
    </q-page-container>
  </q-dialog>
</template>

<script lang="ts">
// import { defineComponent, ref, toRefs } from '@vue/composition-api';

// export default defineComponent({
//   name: 'RegistrationModal',
//   props: {
//     // success: Boolean,
//     openDialog: {
//       type: Boolean,
//       required: true
//     }
//   },
//   setup(props) {
//     const isOpen = toRefs(props);
//     console.log('Hello this is the modal props', isOpen);

//     return {
//       ...isOpen
//     };
//   }
// });
</script>

<style scoped></style>
