<template>
  <q-page class="row items-start justify-evenly">
    <q-img class="ellipse" src="~assets/layer 1.svg" />
  </q-page>
</template>

<script lang="ts">
// import { Todo, Meta } from '../components/models';
// import ExampleComponent from '../components/CompositionComponent.vue';
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'PageIndex'
  // components: { ExampleComponent },
  // setup() {
  //   const todos = ref<Todo[]>([
  //     {
  //       id: 1,
  //       content: 'ct1'
  //     },
  //     {
  //       id: 2,
  //       content: 'ct2'
  //     },
  //     {
  //       id: 3,
  //       content: 'ct3'
  //     },
  //     {
  //       id: 4,
  //       content: 'ct4'
  //     },
  //     {
  //       id: 5,
  //       content: 'ct5'
  //     }
  //   ]);
  //   const meta = ref<Meta>({
  //     totalCount: 1200
  //   });
  //   return { todos, meta };
  //  }
});
</script>
<style>
* {
  font-family: 'BarlowSemiCondensed-Regular';
  font-size: 1.06rem;
}
.block {
  font-family: 'BarlowSemiCondensed-Bold';
}
.q-page-container {
  padding-top: unset !important;
  /* background-image: url("~assets/layer.svg");; */
}

.ellipse {
  top: -6px;
  z-index: -1;
}
</style>
