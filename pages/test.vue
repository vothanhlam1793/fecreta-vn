<template>
  <div class="row">
    <div class="col-12 col-md-3 d-none d-md-block">
      <h1>Thuộc tính</h1>
    </div>
    <div class="col-12 col-md-9" v-if="loadDataDone">
      <h1>Danh sách hàng hoá</h1>
      {{ products }}
    </div>
    <div class="col-12 col-lg-9" v-else>
      <b-spinner></b-spinner>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
export default {
  components: {

  },
  data() {
    return {
      count: 0,
      loadDataDone: true,
      attributes: []
    }
  },
  watch: {
    products(n, o) {
      this.filterAttribute();
    }
  },
  methods: {
    filterAttribute() {
      console.log(this.products)
      var that = this;
      this.atts = [];
      this.products.data.forEach(product => {
        let atts = product.attributes.product_attributes.data.map(item => {
          return {
            group: {
              name: item.attributes.attribute_group.data.attributes.name,
              slug: item.attributes.attribute_group.data.attributes.slug,
              products: item.attributes.attribute_group.data.attributes.product_attributes
            },
            name: item.attributes.name,
            id: item.id
          }
        })
        that.atts.push(atts);
      });
      console.log(that.atts);
    }
  },
  apollo: {
    products: {
      query: gql`
            query Products{
  products(filters: {
    branch: {
      name: {
        eq: "IMOU"
      }
    }
  }, pagination: {
    pageSize: 10,
    page: 0
  }) {
    data {
      id
      attributes {
        slug
        name
        price
        priceDealer
        priceInstall
        product_attributes {
          data {
            id
            attributes {
              name
              attribute_group {
                data {
                  id
                  attributes {
                    name
                    slug
                    product_attributes {
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
          }
        }
        branch {
          data {
            attributes {
              name
            }
            id
          }
        }
        description
        descriptionShort
        imagePresent {
          data {
            id
            attributes {
              url
            }
          }
        }
      }
    }
  }
}
            `
        }
    },
    created(){

    },
    mounted(){
    }
}
</script>
