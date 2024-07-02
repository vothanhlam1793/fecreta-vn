<template>
    <div>
        <h3>{{ title }}</h3>
        <b-table striped hover :items="items" :fields="fields" @row-clicked="showModal">
            <template #cell(image)="data">
                <b-img thumbnail fluid :src="data.item.imageUrl ? url_be + data.item.imageUrl : url_be + url_no_image"
                    alt="Image 1" width="50" height="50"></b-img>
            </template>
        </b-table>
        <ProductModal v-if="selectedProduct" :product="selectedProduct" @close="selectedProduct = null" />
    </div>
</template>

<script>
import Item from './Item.vue';
import ProductModal from '../Product/TableLodash/ProductModal.vue';
export default {
    components: {
        Item,
        ProductModal
    },
    props: ['products', 'title'],
    data() {
        return {
            fields: [{
                key: "image",
                label: "Ảnh"
            }, {
                key: "name",
                class: "align-middle",
                label: "Tên sản phẩm"
            }, {
                key: "price",
                class: "align-middle",
                label: "Giá bán"
            }],
            items: [],
            selectedProduct: null
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
    methods: {
        showModal(item, index, event) {
            this.selectedProduct = item.product;
            var that = this;
            setTimeout(function () {
                that.$bvModal.show('modal-1');
            }, 100);
        }
    },
    mounted() {
        this.items = this.products.map(product => {
            return {
                isActive: true,
                name: product.name,
                price: product.price.toLocaleString('vi-VN', {
                    style:
                        'currency', currency: 'VND'
                }),
                imageUrl: product.imageUrl,
                product: product
            }
        });
    }
}
</script>