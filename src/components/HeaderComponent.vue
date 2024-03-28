<template>
  <div class="container">
    <header class="header">
      <nav>
        <RouterLink class="logo-link" to="/"
          ><SvgIcon class="logo" iconName="logo"></SvgIcon
        ></RouterLink>
      </nav>
    </header>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
</script>

<style scoped>
.container {
  container-type: inline-size;
}
.header {
  padding-block: 1.5rem;
  & > nav {
    display: flex;
  }
}
.logo-link {
  display: block;
}
.logo {
  height: 4rem;
  width: 11.375rem;
  stroke: none;
  fill: var(--color-primary-900);
}

@container (width < 89rem) {
  .header {
    padding-block: 1rem;
  }
  .logo-link {
    height: 2.5rem;
  }
  .logo {
    height: 2.5rem;
    width: 113.75px;
  }
}
</style>
