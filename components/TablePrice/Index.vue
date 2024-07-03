<template>
    <div v-if="products.length > 0">
        <b-form-input v-model="searchQuery" placeholder="Tìm kiếm sản phẩm..." class="mb-3 sticky-input" />
        <Table v-for="category in categoriesList" :key="category.id" :products="getProducts(category.products)"
            :title="category.name" @showModalTable="showProduct"></Table>
        <ProductModal v-if="selectedProduct" :product="selectedProduct" @close="selectedProduct = null"
            :idModal="idModal" />
    </div>
    <div v-else>
        <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
    </div>
</template>

<script>
import Table from './Table.vue';

export default {
    props: ['products'],
    components: {
        Table
    },
    data() {
        return {
            searchQuery: '',
            tables: [],
            categoriesList: [],
            selectedProduct: null,
            idModal: `MD${Math.round(Math.random() * 1000)}`,
            filterProducts: [],
        }
    },
    watch: {
        searchQuery(n, o) {
            this.filteredProducts();
        }
    },
    methods: {
        chuyentiengviet(str) {
            if (str == undefined) {
                return "";
            }
            return str
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/đ/g, "d")
                .replace(/Đ/g, "D");
        },
        filteredProduct2() {
            var that = this;
            var changeSearchReg = that.chuyentiengviet(that.searchQuery)
                .split(" ")
                .join("[ -w]+");
            var reg = new RegExp(changeSearchReg, "i");
            console.log(reg);
            this.filterProducts = that.products.filter(function (e) {
                var temp = [e.name];
                return reg.test(that.chuyentiengviet(temp.join(" ")));
            });
        },
        showProduct(product) {
            this.selectedProduct = product;
            var that = this;
            setTimeout(function () {
                that.$bvModal.show(`${that.idModal}`);
            }, 100);
        },
        createTableProduct() {
            var uniqueCategories = {};
            this.filterProducts.forEach(product => {
                product.categories.forEach(category => {
                    if ((!uniqueCategories[category.id]) && (category.type == "Nhóm hàng")) {
                        uniqueCategories[category.id] = category;
                        uniqueCategories[category.id].products = [];
                    }
                    if (uniqueCategories[category.id]) {
                        uniqueCategories[category.id].products.push(product.id);
                    }
                })
            });
            this.categoriesList = Object.values(uniqueCategories);
        },
        getProducts(productIds) {
            return this.filterProducts.filter(product => {
                var exists = productIds.includes(product.id);
                return exists;
            });
        },
        filteredProducts() {
            if (this.searchQuery !== "") {
                this.filteredProduct2();
            } else {
                this.filterProducts = this.products.map(product => product);
            }
            this.createTableProduct();
        }
    },
    created() {
        this.filterProducts = this.products.map(product => product);
        this.createTableProduct();
    },
    mounted() {
    }
}
</script>

<style>
.sticky-input {
    position: sticky;
    top: 10px;
    /* Điều chỉnh khoảng cách từ đầu trang */
    z-index: 999;
    /* Để đảm bảo rằng nó hiển thị trên các phần tử khác */
    background-color: white;
    /* Điều chỉnh màu nền nếu cần */
    padding: 8px;
    /* Điều chỉnh khoảng cách nội dung */
    /* Các thuộc tính khác tùy thuộc vào thiết kế của bạn */
}
</style>