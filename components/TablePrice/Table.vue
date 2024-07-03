<template>
    <div>
        <h3>{{ title }}</h3>
        <b-table striped hover :items="items" :fields="fields" @row-clicked="showModal">
            <template #cell(image)="data">
                <b-img thumbnail fluid :src="data.item.imageUrl ? url_be + data.item.imageUrl : url_be + url_no_image"
                    alt="Image 1" width="50" height="50"></b-img>
            </template>
        </b-table>
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
                label: "Ảnh",
                thStyle: { width: '10%' }  // Đặt chiều rộng cột theo phần trăm
            }, {
                key: "name",
                class: "align-middle",
                label: "Tên sản phẩm",
                thStyle: { width: '70%' }  // Đặt chiều rộng cột theo phần trăm
            }, {
                key: "price",
                class: "align-middle",
                label: "Giá bán",
                thStyle: { width: '20%' }  // Đặt chiều rộng cột theo phần trăm

            }],
            items: []
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
            this.$emit("showModalTable", item.product);
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