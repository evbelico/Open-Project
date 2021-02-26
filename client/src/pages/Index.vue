<template>
  <q-page class="row items-start justify-evenly">
    <q-img class="ellipse" src="~assets/layer 1.svg" />
    <div class="community">
      <p class="text-h2">Communauté</p>
      <p>Description</p>
    </div>
    <div class="services">
      <p class="text-h2">Services</p>
      <p>Description</p>
    </div>
    <div class="dating">
      <p class="text-h2">Rencontres</p>
      <p>Description</p>
    </div>
    <div class="forum">
      <p class="text-h2">Forum</p>
      <p>Description</p>
    </div>
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

.community {
  position: absolute;
  top: 5%;
  right: 15%;
}

.services {
  position: absolute;
  top: 28%;
  left: 15%;
}

.dating {
  position: absolute;
  top: 50%;
  right: 15%;
}

.forum {
  position: absolute;
  top: 71%;
  left: 15%;
}

.text-h2 {
  font-size: 1.75rem;
  margin: 0;
}
@media screen and (min-width: 320px) {
  .text-h2 {
    font-size: calc(1.75rem + 6 * ((100vw - 320px) / 680));
    margin: 0 0 calc(0px + 6 * ((100vw - 320px) / 680));
  }
}
@media screen and (min-width: 1000px) {
  .text-h2 {
    font-size: 3.75rem;
    margin: 0 0 16px;
  }
}
</style>
