<template>
    <b-row>
        <b-col v-if="products.length > 0">
            <TableProduct 
                :products="products"
                :col="4"
            />
        </b-col>
        <b-col v-else>
            <p>Không tìm thấy sản phẩm</p>
        </b-col>
    </b-row>
</template>
<script>
import TableProduct from '~/components/Product/TableMilliSearch/Index.vue'
export default {
    head(){
        return {
            script: [
                { src: "https://cdn.jsdelivr.net/npm/meilisearch@latest/dist/bundles/meilisearch.umd.js"}
            ],
        }
    },
    components: {
        TableProduct
    },
    computed: {
        search_host(){
            return process.env.SEARCH_HOST;
        },
        search_key(){
            return process.env.SEARCH_KEY;
        },
        url_be(){
            return process.env.BACKEND_URL_IMAGE;
        },
        url_no_image(){
            return process.env.NO_IMAGE;
        }
    },
    data(){
        return {
            products: []
        }
    },
    created(){
        if(process.client){
            this.searchProduct(this.$route.params.key);
        }
    },
    methods:{
        async searchProduct(name){

            if(name.length > 0 ){
                this.products = [];
            } else {
                return;
            }
            // console.log("SEARCH: ", name);
            const client = new MeiliSearch({
                host: this.search_host,
                apiKey: this.search_key,
            })
            // console.log(client);
            var index = client.index("product");
            let res = await index.search(name);
            this.products = res.hits;
            // console.log(this.products)
        },
    }

}
</script>