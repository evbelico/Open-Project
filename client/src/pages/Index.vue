<template>
  <q-page class="row items-center justify-evenly">
    <q-img class="ellipse" src="~assets/layer.svg" />
    <!-- <q-img class="illustrations flower" width="20%" src="~assets/flower.svg" />
    <div class="illustration-container community">
      <q-img width="96%" class="illustrations" src="~assets/circle_1.svg" />
      <q-img
        width="42%"
        class="illustrations group"
        src="~assets/Group of humans.svg"
      />
    </div>
    <div class="illustration-container services">
      <q-img width="96%" class="illustrations" src="~assets/circle_2.svg" />
      <q-img width="60%" class="illustrations hands" src="~assets/Hands.svg" />
    </div>
    <div class="illustration-container dates">
      <q-img width="96%" class="illustrations" src="~assets/circle_3.svg" />
      <q-img
        width="48%"
        class="illustrations friends"
        src="~assets/Friends.svg"
      />
    </div>
    <div class="illustration-container forum">
      <q-img width="96%" class="illustrations" src="~assets/circle_4.svg" />
      <q-img
        width="50%"
        class="illustrations speaking"
        src="~assets/Human speaking.svg"
      />
    </div> -->
    <!-- <example-component
      title="Example component"
      active
      :todos="todos"
      :meta="meta"
    ></example-component>
    <div>bloublou</div> -->
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
  padding-top: unset;
}

.ellipse {
  top: -235px;
  z-index: -1;
}

.flower {
  top: -57px;
  right: 30px;
}

.illustrations {
  position: absolute;
}

.illustration-container {
  width: 100%;
  height: 4%;
  position: absolute;
}

.community {
  top: -3%;
}
.services {
  top: 23%;
}
.dates {
  top: 42%;
}
.forum {
  top: 66%;
}

.group {
  /* top: 76px; */
  left: 8%;
}
.hands {
  right: 1%;
  /* top: -51px; */
}
.friends {
  /* top: 42px; */
  left: 10%;
}
.speaking {
  right: 10%;
}
</style>
