<template>
  <div class="row">
    <div class="col-12 col-md-3 d-none d-md-block">
      <SideBar :menus="sidemenus.data[0]" />
    </div>
    <div
      class="col-12 col-md-9"
      v-if="loadDataDone"
    >
      <div class="row">
        <div
          class="col"
          v-if="showBanner"
        >
          <Banner :banner="homePage.data.attributes.banner.data" />
        </div>
        <div
          class="col"
          v-else
        >
          <b-spinner></b-spinner>
        </div>
      </div>
      <b-row v-if="showBanner">
        <b-col>
          <TableProductCategory 
            v-for="(shelve, index) in homePage.data.attributes.shelves"    
            v-if="shelve.enable"  
            :col="shelve.col"
            :row="shelve.row"
            :title="shelve.title"
            :key="'HP' + index"
            :category="shelve.category_product.data.attributes.name"    
          />
        </b-col>
      </b-row>
    </div>
    <div
      class="col-12 col-lg-9"
      v-else
    >
      <b-spinner></b-spinner>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import SideBar from '~/components/HomePage/Sidebar.vue';
import Banner from '~/components/HomePage/Banner.vue';
import TableProduct from '~/components/Product/Table/Index.vue'
import TableProductCategory from '~/components/Product/Table/Category.vue'
export default {
  data() {
    return {
      loadDataDone: true,
      showBanner: false
    }
  },
  watch: {
    homePage(n, o) {
      if(n){
        this.showBanner = true;
        this.updateTitle(this.homePage.data.attributes.title)
      }
    }
  },
  methods:{
    updateTitle(title){
      document.title = title;
    }
  },
  head() {
    return {
      title: "CRETA SHOP",
    }
  },
  components: {
    SideBar,
    Banner,
    TableProduct,
    TableProductCategory
  },
  apollo: {
    products: {
      query: gql`
              query {
  products(filters: {
    categories: {
      name: {
        eq: "Phụ kiện"
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
    },

    homePage: {
      fetchPolicy: 'cache-and-network',
      query: gql`
                query {
                    homePage {
                        data {
                        attributes {
                          shelves {
          
          col
          enable
          row
          title
          category_product {
            data {
              attributes {
                name
              }
            }
          }
        }
                            title
                            banner {
          data {
            attributes {
              items {
                image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                index
                url
              }
              title
            }
            id
          }
        }
                            sidemenu {
          data {
            attributes {
              menus {
                index
                menu {
                  data {
                    attributes {
                      items {
                        id
                        index
                        title
                        url
                      }
                      title
                    }
                    id
                  }
                }
                id
              }
              title
              type
            }
            id
          }
        }
                        }
                        }
                    }
                }
                `
    },
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
    }
  }
}

</script>
