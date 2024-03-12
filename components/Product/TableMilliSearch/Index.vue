<template>
    <div class="row bg-light my-2">
        <div class="col p-2">
            <div class="row no-gutters">
                <div class="col pl-2 pt-3"
                    style="background-color: #f5f5f5;"
                >
                    <h4>{{ title }}</h4>
                </div>
            </div>
        </div>
        <div class="row no-gutters"
            style="background-color: #f5f5f5;"
        >
                <div 
                    :class="getColumnClass()"
                    v-for="product in products.slice(0, col * row)"
                    :key="product.id"
                >
                    <ItemProductTable 
                        :product="product"
                    />
                </div>
            </div>
    </div>
</template>
<script>
import ItemProductTable from '~/components/Product/TableMilliSearch/Item.vue';
export default {
    props: {
        products: {
            type: Array,
            default: function(){
                return [];
            }
        },
        col: {
            type: Number,
            default: function(){
                return 1;
            }
        },
        row: {
            type: Number,
            default: function(){
                return 4;
            }
        },
        title: {
            type: String,
            default: function(){
                return "Bảng hàng hoá";
            }
        }
    },
    components: {
        ItemProductTable,
    },
    methods: {
        getColumnClass(columns) {
        // Tính toán lớp cột dựa trên số cột
        const colClass = `col-12 col-md-${12 / this.col} p-1`;
        return colClass;
        },
    }
}
</script>