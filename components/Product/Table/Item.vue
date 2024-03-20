<template>
    <b-row
        class="px-1 py-2 bg-white mb-2"
        no-gutters
    >
        <b-col class="text-center">
            <div class="position-relative">
                <div class="position-absolute" style="top: 5px; right: 5px" v-if="product.attributes.tagProduct">
                    <b-badge :variant="product.attributes.tagProduct.variant" class="">
                        {{ product.attributes.tagProduct.content }}
                    </b-badge>
                </div>
                <b-img
                    thumbnail
                    fluid
                    :src="product.attributes.imagePresent.data ? url_be + product.attributes.imagePresent.data.attributes.url : url_be + url_no_image"
                    alt="Image 1"
                ></b-img>
            </div>
            <div class="product-info">

                <a :href="`/products/${product.attributes.slug}`">{{ product.attributes.name }}</a>
            </div>
            <p>{{ product.attributes.price != null ? product.attributes.price.toLocaleString('vi-VN', {
                    style:
                        'currency', currency: 'VND'
                }) : "Chưa cập nhật" }}</p>
            <b-button variant="primary">
                Mua hàng
            </b-button>
        </b-col>
    </b-row>
</template>
<script>
export default {
    props: ['product'],
    computed: {
        url_be() {
            return process.env.BACKEND_URL_IMAGE;
        },
        url_no_image() {
            return process.env.NO_IMAGE;
        }
    },
}
</script>

<style scoped>
.product-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 3em; /* Đặt chiều cao tùy chỉnh, có thể điều chỉnh theo nhu cầu của bạn */
  overflow: hidden;
}

.product-info a {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>