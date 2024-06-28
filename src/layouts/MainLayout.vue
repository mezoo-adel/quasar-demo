<template>
  <q-layout view="lHh lpR fFf" class="full-height">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Navbar Title
        </q-toolbar-title>

        <q-select
          v-model="locale"
          :options="availableLocales"
          :label="$t('language')"
          dense
          borderless
          emit-value
          map-options
          options-dense
          style="min-width: 100px"
        />
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab class="full-width" to="/login" :label="$t('login')" />
        <q-route-tab class="full-width" to="/home" label="Page Two" />
      </q-tabs>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" elevated behavior="mobile">
      <p class="text-info" v-for="n in 150" :key="n">
        {{ $t('abdelbaset_hamoda') }}
      </p>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const leftDrawerOpen = ref(false);
const { locale, availableLocales } = useI18n();

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>
