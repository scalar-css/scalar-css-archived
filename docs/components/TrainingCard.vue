<template>
  <div class="bg-white h-full rowLayout gap-ru card-shadow">
    <img :src="require(`~/assets/${image}.jpg`)" />

    <div>
      <h5 class="type-0 color-primary-2 px-su" style="--typeMarginBottom: 0;">
        {{ title }}
      </h5>

      <ul class="list-checkmarks rowLayout gap-ru p-su">
        <li
          v-for="(bullet, index) in bullets"
          :key="index"
          class="-type-2 d-flex flex-gap gap-ru"
        >
          <div class="checkmark"><icon-checkmark /></div>
          <span v-html="bullet" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import IconCheckmark from '@/assets/icons/icon-checkmark.svg'

  export default {
    components: {
      IconCheckmark
    },
    props: {
      title: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      bullets: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style lang="postcss">
  .checkmark {
    flex: 1 0 12px;
    max-width: 12px;
    margin-top: 0.5em;

    svg {
      max-width: 100%;
    }
  }

  .card-shadow {
    box-shadow: 0px 5px 17px rgba(0, 0, 0, 0.5);
  }
</style>
