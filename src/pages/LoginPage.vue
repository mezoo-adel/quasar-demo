<template>
  <q-page padding class="flex justify-center">
    <div class="full-width q-mt-lg" style="max-width: 500px">
      <q-form ref="form" @submit="submit" class="q-gutter-md">
        <q-card class="my-card">
          <q-card-section class=" ">
            <q-input
              v-model="data.email"
              label="Email"
              name="email"
              type="email"
              :rules="rules"
              clearable
              dense
            />
            <q-input
              v-model="data.password"
              label="Password"
              name="password"
              type="password"
              :rules="rules"
              clearable
              dense
            />
          </q-card-section>

          <!-- <q-separator /> -->

          <q-card-actions align="right">
            <q-btn :label="$t('login')" type="submit" color="primary" />
          </q-card-actions>
        </q-card>
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useUserStore } from 'stores/user-store';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const router = useRouter();
const { t } = useI18n();
const user = useUserStore();

const form = ref();
const data = reactive<{ email: string; password: string }>({
  email: '',
  password: '',
});

const rules = computed(() => {
  return [
    (val: string) => !!val || t('required'),
    (val: string) => val.length > 8 || t('minLength', { min: 8 }),
  ];
});
function submit() {
  if (form.value.validate()) {
    user.data.email = data.email;
    user.data.token = 'token';
    console.log('data', user.data);
    router.push('home');
  }
}

onMounted(() => {
  if (user.data.token) {
    $q.notify({
      progress: true,
      message: t('alreadyLoggedIn'),
      color: 'positive',
      timeout: 1000,
      avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
    });
    // router.push('home');
  }
});
</script>
