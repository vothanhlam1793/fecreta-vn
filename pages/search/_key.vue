<template>
    <b-row>
        <b-col v-if="$apolloData.queries.searchPage.loading == false"
            class="col-12 col-lg-3"
        >
            <SideBar :id="page.attributes.sidemenu.data.id"/>

        </b-col>
        <b-col v-if="products.length > 0"
            class="col-12 col-lg-9"    
        >
            <TableProduct 
                :products="products"
                :col="4"
            />
        </b-col>
        <b-col v-else
            class="col-12 col-lg-9"
        >
            <p>Không tìm thấy sản phẩm</p>
        </b-col>
    </b-row>
</template>
<script>
import gql from 'graphql-tag';
import SideBar from '~/components/Common/Sidebar.vue';
import TableProduct from '~/components/Product/TableMilliSearch/Index.vue'
export default {
    head(){
        return {
            script: [
                { src: "https://cdn.jsdelivr.net/npm/meilisearch@latest/dist/bundles/meilisearch.umd.js"}
            ],
        }
    },
    apollo: {
        searchPage: {
            query: gql`
            query Query {
                searchPage {
                    data {
                    id
                    attributes {
                        sidemenu {
                        data {
                            id
                        }
                        }
                        title
                    }
                    }
                }
            }
            `
        }
    },
    components: {
        TableProduct, SideBar
    },
    computed: {
        page(){
            console.log(this);
            // return 2;
            return this.$apolloData.data.searchPage.data;
        },
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