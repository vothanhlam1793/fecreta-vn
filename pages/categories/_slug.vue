<template>
    <div class="row">
        <div class="col-12 col-lg-3">
            <SideBar :menus="sidemenus.data[0]" />
        </div>
        <div class="col-12 col-lg-9">
            <TableProduct 
                :products="categories.data[0] ? categories.data[0].attributes.products.data : []"
                :col="4"    
            />
        </div>
    </div>
</template>
<script>
import gql from 'graphql-tag';
import SideBar from '~/components/HomePage/Sidebar.vue';
import TableProduct from '~/components/Product/Table/Index.vue';
export default {
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