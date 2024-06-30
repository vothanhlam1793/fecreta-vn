<template>
    <b-row class="px-1 py-2 bg-white mb-2" no-gutters>
        <b-col class="text-center">
            <div class="position-relative">
                <b-img thumbnail fluid :src="product.imageUrl ? url_be + product.imageUrl : url_be + url_no_image"
                    alt="Image 1"></b-img>
            </div>
            <div class="product-info">

                <a :href="`/products/${product.slug}`">{{ product.name }}</a>
            </div>
            <p>{{ product.price != null ? product.price.toLocaleString('vi-VN', {
                style:
                    'currency', currency: 'VND'
            }) : "Chưa cập nhật" }}</p>
            <b-button variant="primary" @click="$emit('showProduct', product)">
                Xem
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
    mounted() {
        // console.log(this.product);
    },
}
</script>

<style scoped>
.product-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 3em;
    /* Đặt chiều cao tùy chỉnh, có thể điều chỉnh theo nhu cầu của bạn */
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