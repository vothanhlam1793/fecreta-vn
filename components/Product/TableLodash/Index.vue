<template>
    <div class="row no-gutters" style="background-color: #f5f5f5;">
        <div class="col-12 col-md-3 p-1" v-for="product in products" :key="product.id">
            <Item :product="product" @showProduct="showProduct" />
        </div>
        <product-modal v-if="selectedProduct" :product="selectedProduct"
            @close="selectedProduct = null"></product-modal>
    </div>
</template>

<script>
import Item from './Item.vue'
import ProductModal from './ProductModal.vue'
export default {
    components: {
        Item,
        ProductModal
    },
    props: ['products'],
    data() {
        return {
            selectedProduct: null
        }
    },
    methods: {
        showProduct(product) {
            this.selectedProduct = product;
            // this.$bvModal.show('modal-1');
            var that = this;
            setTimeout(function () {
                // that.selectedProduct = product;
                that.$bvModal.show('modal-1');
            }, 100);
        }
    }
}
</script>