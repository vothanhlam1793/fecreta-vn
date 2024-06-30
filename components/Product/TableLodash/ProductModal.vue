<template>
    <div>
        <b-modal id="modal-1" title="Thông tin sản phẩm">
            <div class="product-info">
                <div class="text-center">
                    <b-img :src="url_be + product.imageUrl" fluid alt="Product Image"></b-img>
                    <h3>{{ product.name }}</h3>
                </div>
                <div class="row">
                    <div class="col text-center">
                        <p><strong>Giá:</strong> {{ product.price.toLocaleString('vi-VN', {
                            style:
                                'currency', currency: 'VND'
                        }) }}</p>

                    </div>
                    <div class="col">
                        <p><strong>Hãng:</strong> {{ product.branch }}</p>
                    </div>
                </div>
                <b-tabs>
                    <b-tab title="Mô tả">
                        <div v-html="product.description"></div>
                    </b-tab>
                    <b-tab title="Đặc tính">
                        <b-list-group>
                            <b-list-group-item v-for="attr in product.productAttributes" :key="attr.id">
                                <strong>{{ attr.groupName }}:</strong> {{ attr.name }}
                            </b-list-group-item>
                        </b-list-group>
                    </b-tab>
                </b-tabs>
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
    props: {
        product: {
            type: Object,
            required: true
        }
    },
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

<style>
.product-info img {
    width: 100%;
    max-width: 300px;
    margin-bottom: 20px;
}
</style>