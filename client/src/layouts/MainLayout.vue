<template>
  <q-layout view="lHh Lpr lFf" class="shadow-2 rounded-borders">
    <q-header elevated class="bg-theme">
      <div class="row items-center justify-evenly">
        <div class="col-12">
          <q-toolbar class="q-my-md">
            <!-- <q-img src="~assets/scarabee.png" style="max-width: 4rem" contain /> -->
            <a href="/">
              <q-img
                src="~assets/scarabee_home.svg"
                alt="Scarabée logo"
                width="300px"
                contain
                no-default-spinner
              />
            </a>
            <q-space />
            <!-- <q-toolbar-title class="header-font-color">
            <a href="/">Scarabée</a>
          </q-toolbar-title> -->

            <q-btn
              color="primary"
              text-color="secondary"
              class="q-mx-sm gt-sm"
              label="S'inscrire"
              aria-label="S'inscrire"
              no-caps
              to="/register"
            />
            <q-btn
              color="secondary"
              text-color="primary"
              class="q-mx-sm gt-sm"
              label="Se connecter"
              aria-label="Se connecter"
              no-caps
              to="/login"
            />
            <q-btn
              color="primary"
              flat
              round
              icon="menu"
              aria-label="Menu"
              class="lt-md"
              @click="leftDrawerOpen = !leftDrawerOpen"
            />
          </q-toolbar>
        </div>
        <div class="row items-center justify-center gt-sm">
          <div class="col-12">
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
        </div>
      </div>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" class="lt-md">
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
    title: 'Se connecter',
    caption: 'Page de connexion',
    icon: 'fa fa-save',
    link: '/login'
  },
  {
    title: "S'inscrire",
    caption: "Page d'inscription",
    icon: 'fa fa-save',
    link: '/register'
  },
  {
    title: "Scarabée c'est quoi ?",
    caption: "Page d'informations",
    icon: 'fa fa-save',
    link: '/'
  },
  {
    title: 'Communauté',
    caption: 'À propos de la communauté',
    icon: 'fa fa-save',
    link: '/community'
  },
  {
    title: 'Forum',
    caption: 'Direction le forum',
    icon: 'fa fa-save',
    link: '/redirect-forum'
  },
  {
    title: 'Services',
    caption: 'Direction les services',
    icon: 'fa fa-save',
    link: '/redirect-services'
  },
  {
    title: 'Rencontres',
    caption: 'Direction les rencontres',
    icon: 'fa fa-save',
    link: '/redirect-meeting'
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
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
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
