// frontend/layouts/default.vue
<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <Header />
        <nuxt />
        <Footer />
      </div>
    </div>
  </div>
</template>
<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
export default {
  components: {
    Header,
    Footer
  },
  head(){
    return {
      link: [
        // { rel: 'stylesheet', href: '~/assets/ckeditor.css' }
      ]
    }
  }
}
</script>