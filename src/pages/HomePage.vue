<template>
  <q-page
    v-touch-pan.prevent.mouse="handlePan"
    class="flex justify-center text-center"
    style="background-image: url('background.jpg'); background-position: center"
  >
    <div style="background-color: #fbfbfb1f">
      <div class="row text-center">
        <h1>
          {{ $t('high_score') }} <br />
          {{ highest }}
        </h1>
      </div>
      <div class="row full-width" style="max-width: 450px">
        <div class="col-4">
          <q-btn
            round
            color="primary"
            icon="remove"
            @click="decreaseScore"
            v-touch-repeat:500:200:50.mouse="decreaseScore"
          />
        </div>

        <div class="col-4 text-h3 text-white">
          {{ result }}
        </div>

        <div class="col-4">
          <q-btn
            round
            color="primary"
            icon="add"
            @click="increaseScore"
            v-touch-repeat:500:200:50.mouse="increaseScore"
            v-touch-pan.prevent.mouse="handlePan"
          />
        </div>
        <div
          class="col-12 text-dark"
          style="text-align: left !important ; margin-top: 28px"
        >
          {{ $t('play_hint') }}
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useUserStore } from 'stores/user-store';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { watch } from 'vue';
import { computed } from 'vue';

const router = useRouter();
const { t } = useI18n();
const user = useUserStore();
const $q = useQuasar();

const result = computed({
  get: () => {
    return user.score;
  },
  set: (value) => {
    user.score = value;
  },
});

const highest = computed(() =>
  Number($q.localStorage.getItem('high_score')) >= Number(result.value)
    ? $q.localStorage.getItem('high_score')
    : result.value
);

watch(result, (score) => {
  if (Number(score) > Number(highest.value)) {
    $q.localStorage.set('high_score', score);
  }
});

function increaseScore() {
  result.value++;
}

function decreaseScore() {
  if (result.value) result.value--;
}

function handlePan(evt?: any | null) {
  if (evt.delta.y < 0) {
    increaseScore();
  } else {
    decreaseScore();
  }
}

onMounted(() => {
  if (!user.data.token) {
    $q.notify({
      progress: true,
      message: t('loginRequired'),
      color: 'negative',
      timeout: 1000,
      avatar: 'https://cdn.quasar.dev/img/boy-avatar.png',
    });
    router.push('login');
  }
});
</script>
