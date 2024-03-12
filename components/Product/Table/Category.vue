<template>
    <div class="row my-2">
        <div class="col">
            <div class="row no-gutters">
                <div class="col pl-2 pt-3"
                    style="background-color: #f5f5f5;"
                >
                    <h4 class="">{{ title }}</h4>
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
    </div>
</template>
<script>
import gql from 'graphql-tag';
import ItemProductTable from '~/components/Product/Table/Item.vue';
export default {
    props: {
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
        },
        category: {
            type: String,
            default: function(){
                return undefined;
            }
        }
    },
    components: {
        ItemProductTable
    },
    data(){
        return {
            products: []
        }
    },
    methods: {
        getColumnClass(columns) {
        // Tính toán lớp cột dựa trên số cột
        const colClass = `col-12 col-md-${12 / this.col} p-1`;
        return colClass;
        },
        async getProducts(){
            var client = this.$apolloProvider.defaultClient;
            var { data } = await client.query({
                query: gql`
              query {
  products(filters: {
    categories: {
      name: {
        eq: "${this.category}"
      }
    }
  }) {
    data {
      id
      attributes {
        tagProduct {
              content
              variant
        }
        price
        name
        slug
        imagePresent {
          data {
            id
            attributes {
              url
            }
          }
        }
        code
      }
    }
  }
}
            `
            });
            this.products = data.products.data;
        }
    },
    created(){
        if(process.client){
            this.getProducts();
        }
    }
}
</script>

