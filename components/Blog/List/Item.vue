<template>
<b-card>
  <b-row no-gutters>
    <!-- Hình ảnh bên trái -->
    <b-col class="col-3">
      <div>
        <b-img :src="blog.attributes.imagePresent.data ? url_be + blog.attributes.imagePresent.data.attributes.url : url_be + url_no_image" alt="Image" fluid
        class="image-height"
      ></b-img>
      </div>
    </b-col>

    <!-- Nội dung (content) bên phải -->
    <b-col class="col-9">
      <b-card-body class="short-description">
        <h4>{{ blog.attributes.title }}</h4>
        <div v-html="blog.attributes.shortDescription ">
        </div>
      </b-card-body>
      <b-card-footer class="text-right">
        <b-row align-v="center">
          <b-col>
            <b-link @click="viewDetails(blog.attributes.slug)">Xem thêm</b-link>
          </b-col>
        </b-row>
      </b-card-footer>
    </b-col>
  </b-row>
</b-card>
</template>
<script>
import blog from '../../../plugins/blog';

export default {
    computed: {
        url_be(){
            return process.env.BACKEND_URL_IMAGE;
        },
        url_no_image() {
            return process.env.NO_IMAGE;
        }
    },
    props: ['blog'],
    methods: {
        viewDetails(slug) {
            // Xử lý khi người dùng muốn xem chi tiết bài viết
            // console.log('View details:', this.blog.id);
            this.$router.push("/blog/" + slug);
        },
    }
}
</script>

<style>
.image-height {
  height: 10em;
  object-fit: cover; /* Chọn kiểu canh lấy (cover, contain, ...) */
}

.short-description div {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>