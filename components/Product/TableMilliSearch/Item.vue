<template>
        <b-row
        class="border p-1 bg-white"
        no-gutters
    >
        <b-col
            class="text-center"
        >
            <div class="position-relative">
                <div class="position-absolute" style="top: 5px; right: 5px" v-if="product.tagProduct">
                    <b-badge :variant="product.tagProduct.variant">
                        {{ product.tagProduct.content }}
                    </b-badge>
                </div>
            <b-img thumbnail fluid 
                :src="product.imagePresent ? url_be + product.imagePresent.url :  url_be + url_no_image" alt="Image 1"></b-img>
            </div>
            
                <div class="product-info">
                <a :href="`/products/${product.slug}`">{{ product.name }}</a>
            </div>
            <p>{{ product.price != null ? product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : "Chưa cập nhật" }}</p>
            <b-button
                variant="primary"
            >
                Mua hàng
            </b-button>
        </b-col>
    </b-row>
</template>
<script>
export default {
    props: ['product'],
    computed: {
        url_be(){
            return process.env.BACKEND_URL_IMAGE;
        },
        url_no_image(){
            return process.env.NO_IMAGE;
        }
    }
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