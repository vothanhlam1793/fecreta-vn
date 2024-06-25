<template>
    <div v-if="tpPage.data">
        <div
            v-for="(tp, index) in tpPage.data.attributes.table_products.data"    
            :key="'TP' + index"
            class="p-2"
        >
            <TableProduct   
                :id="tp.id"
            />
            <hr>
        </div>
    </div>
</template>
<script>
import gql from 'graphql-tag';
import TableProduct from '~/components/TableProduct/Index.vue';
export default {
    components: {
        TableProduct
    },
    data(){
        return {
            tableProducts: [],
        }
    },
    watch: {
        tpPage(){
            console.log(this.tpPage);
        }
    },
    methods: {

    },
    apollo: {
        tpPage: {
            query: gql`
            query {
                tpPage {
                    data {
                    id
                    attributes {
                        title
                        table_products {
                        data {
                            id
                        }
                        }
                    }
                    }
                }
                }
            `
        }
    }
}
</script>