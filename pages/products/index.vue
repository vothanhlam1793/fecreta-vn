<template>
    <div class="row">
        <div class="col-12 col-lg-3">
            <SideBar :menus="sidemenus.data[0]" />
        </div>
        <div class="col-12 col-lg-9">
            <TableProduct 
                :products="products.data"
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
        products: {
            query: gql`
            query {
                products {
                    data {
                    id
                    attributes {
                        slug
                        name
                        branch {
                        data {
                            attributes {
                            name
                            }
                        }
                        }
                        categories {
                        data {
                            attributes {
                            name
                            }
                        }
                        }
                        imagePresent {
                        data {
                            attributes {
                            url
                            }
                        }
                        }
                        price
                        priceInstall
                        descriptionShort
                        description
                        priceDealer
                        tags {
                        data {
                            attributes {
                            name
                            }
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