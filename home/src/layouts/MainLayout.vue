<template>
  <q-layout view="lHh Lpr lFf" class="shadow-2 rounded-borders">
    <q-header elevated class="bg-theme">
      <div class="row items-center">
        <q-toolbar class="q-my-md">
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="leftDrawerOpen = !leftDrawerOpen"
          />

          <q-img src="icons/scarabee.png" style="max-width: 4rem" contain />
          <q-toolbar-title class="header-font-color">
            <a href="/">Scarabée</a>
          </q-toolbar-title>

          <q-btn
            color="primary"
            text-color="secondary"
            label="S'inscrire"
            no-caps
            to="/register"
          />
          <q-btn
            color="secondary"
            text-color="primary"
            label="Se connecter"
            no-caps
            to="/login"
          />
        </q-toolbar>
      </div>
      <div class="row items-center justify-center">
        <q-tabs
          v-model="tab"
          class="text-theme"
          no-caps
          @click="printTab"
          stretch
        >
          <q-route-tab
            name="about"
            label="Scarabée c'est quoi ?"
            to="/"
            exact
            active-class="about-tab"
          />
          <q-route-tab
            name="communaute"
            label="Communauté"
            to="/community"
            exact
            active-class="about-tab"
          />
          <q-route-tab name="forum" to="/" label="Forum" />
          <q-route-tab
            name="services"
            to="/redirect-services"
            exact
            label="Services"
          />
          <q-route-tab name="rencontres" to="/" label="Rencontres" />
        </q-tabs>
      </div>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above>
      <q-list>
        <q-item-label header class="text-grey-8">
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import EssentialLink from '../components/EssentialLink.vue';

const linksData = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  },
  {
    title: 'Login page !',
    caption: "Hello here is the forum's login page",
    icon: 'fa fa-save',
    link: '/login'
  }
];

import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'MainLayout',
  components: { EssentialLink },
  setup() {
    const leftDrawerOpen = ref(false);
    const essentialLinks = ref(linksData);
    let tab = ref('about');

    function printTab() {
      console.log(tab.value);
    }

    return { leftDrawerOpen, essentialLinks, tab, printTab };
  }
});
</script>

<style>
.bg-theme {
  background: #30304c;
}

.text-theme {
  color: #f2c98f;
}

.header-font-color,
.header-font-color a {
  color: #f2c98f;
  text-decoration: none;
  font-size: 3rem;
  font-weight: 200;
}

.link-no-decoration {
  text-decoration: none;
}
</style>
