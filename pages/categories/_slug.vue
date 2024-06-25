<template>
    <div class="row">
        <div class="col-12 col-lg-3">
            <SideBar :menus="sidemenus.data[0]" />
        </div>
        <div class="col-12 col-lg-9">
          <b-row>
            <b-col>
              <b-form-select v-model="perPage" :options="options"></b-form-select>
            </b-col>
            <b-col>
              <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
              ></b-pagination>
            </b-col>
          </b-row>
            <TableProduct 
                :products="products.data"
                :col="4"
                :row="14"   
            />
            <b-row>
            <b-col>
              <b-form-select v-model="perPage" :options="options"></b-form-select>
            </b-col>
            <b-col>
              <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
              ></b-pagination>
            </b-col>
          </b-row>
        </div>
    </div>
</template>
<script>
import gql from 'graphql-tag';
import SideBar from '~/components/HomePage/Sidebar.vue';
import TableProduct from '~/components/Product/Table/Index.vue';
export default {
    data(){
      return {
        products: [],
        perPage: 10,
        currentPage: 1,
        rows: 10,
        options: [
          {value: 10, text: "10"},
          {value: 20, text: "20"},
          {value: 30, text: "30"},
          {value: 50, text: "50"}
        ]
      }
    },
    watch: {
      currentPage(){
        this.getProducts();
      },
      perPage(){
        this.getProducts();
      }
    },  
    created(){
      if(process.client){
        this.getProducts();
      }
    },
    methods: {
      async getProducts(){
        var products = await this.$getProductsWithCategorySlug(this.$route.params.slug, this.currentPage, this.perPage);
        console.log(products);
        this.products = products;
        this.rows = products.meta.pagination.total;
        this.currentPage = products.meta.pagination.page;
        this.perPage = products.meta.pagination.pageSize;
      }
    },
    components: {
        TableProduct,
        SideBar
    },
    apollo: {
        sidemenus: {
      query: gql`
              query{
                sidemenus(filters: {
                  type: {
                    eq: "side-menu"
                  }
                }) {
                  data {
                    attributes {
                      title
                      type
                      menus {
                        id
                        menu {
                          data {
                            attributes {
                              items {
                                index
                                title
                                url
                              }
                              title
                            }
                            id
                          }
                        }
                        index
                      }
                    }
                  }
                }
              }
              `
    },
        categories: {
            query: gql`
                query Query($slug: String!) {
                    categories(filters: {
                        slug: {
                            containsi: $slug
                        }
                    }) {
                        data {
                        attributes {
                            products {
                            data {
                                attributes {
                                code
                                name
                                imagePresent {
                                    data {
                                    attributes {
                                        formats
                                        url
                                    }
                                    }
                                }
                                priceDealer
                                price
                                priceInstall
                                slug
                                }
                            }
                            }
                            name
                            slug
                        }
                        }
                    }
                    }
            
            `,
            variables() {
                return {
                    slug: this.$route.params.slug
                };
            }
        }
    }
}
</script>