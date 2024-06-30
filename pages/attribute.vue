<template>
  <div class="row">
    <div class="col-12 col-md-3 d-none d-md-block">
      <FilterAttribute :attributes="attributeGroups" @updateSelect="updateSelect" />
    </div>
    <div class="col-12 col-md-9" v-if="loadDataDone">
      <h1>Danh sách hàng hoá</h1>
      <TableLodash :products="prodFs" />
    </div>
    <div class="col-12 col-lg-9" v-else>
      <b-spinner></b-spinner>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import gql from "graphql-tag";
import FilterAttribute from '~/components/FilterAttribute/Index.vue';
import TableLodash from '~/components/Product/TableLodash/Index.vue';
export default {
  components: {
    FilterAttribute,
    TableLodash,
  },
  data() {
    return {
      count: 0,
      loadDataDone: true,
      prods: [],
      attributeGroups: [],
      productIds: [],
      prodFs: [],
    };
  },
  watch: {
    products(n, o) {
      // console.log("N", n);
      this.uploadProduct();
    },
  },
  methods: {
    uploadProduct(n) {
      var products = n.data.map((product) => {
        const attributes = product.attributes;
        return {
          id: product.id,
          slug: attributes.slug || "",
          name: attributes.name || "",
          price: attributes.price || 0,
          priceDealer: attributes.priceDealer || 0,
          priceInstall: attributes.priceInstall || 0,
          branch: _.get(attributes, "branch.data.attributes.name", ""),
          description: attributes.description || "",
          descriptionShort: attributes.descriptionShort || "",
          imageUrl: _.get(attributes, "imagePresent.data.attributes.url", ""),
          productAttributes: attributes.product_attributes.data.map((attr) => {
            return {
              id: attr.id,
              name: attr.attributes.name || "",
              groupName: _.get(
                attr,
                "attributes.attribute_group.data.attributes.name",
                ""
              ),
              groupSlug: _.get(
                attr,
                "attributes.attribute_group.data.attributes.slug",
                ""
              ),
            };
          }),
        };
      });
      var atts = {};
      products.forEach((product) => {
        product.productAttributes.forEach((att) => {
          // console.log(att);
          if (atts[att.id] == undefined) {
            atts[att.id] = att;
            atts[att.id].products = [];
          }
          atts[att.id].products.push(product.id);
        });
      });
      this.attributeGroups = atts;
      this.prods = products;
      this.prodFs = this.prods;
      // console.log(this.prodFs);
    },
    updateSelect(sItems) {
      var productIds = [];
      sItems.forEach(item => {
        if (item.status) {
          productIds = productIds.concat(this.attributeGroups[item.id].products);
        }
      });
      this.productIds = [...new Set(productIds)];
      this.filterProduct();
    },
    filterProduct() {
      var that = this;
      this.prodFs = this.prods.filter(prod => {
        let exists = that.productIds.includes(prod.id);
        return exists;
      })
    },
    fetchProducts() {
      var that = this;
      this.$apollo.query({
        query: gql`
                query{
          products(
            filters: ${this.filter}
          ) {
            data {
              id
              attributes {
                slug
                name
                price
                priceDealer
                priceInstall
                tagProduct {
                  content
                  variant
                }
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
                `      }).then(result => {
          // console.log(result.data);
          that.uploadProduct(result.data.products);
        }).catch(error => {
          console.error('Error fetching products:', error);
        });
    }
  },
  created() {
    this.branchName = this.$route.query.branch || ""; // Get branch query parameter
    this.categogy = this.$route.query.categogy || "";
    this.filter = `
    {
      or: [{
        categories: {
          name: {
            eq: "${this.categogy}"
          }
        }
      }, {
        branch: {
          name: {
            eq: "${this.branchName}"
          }
        }
      }]
    }
    `
    this.fetchProducts();
  },
  mounted() { },
};
</script>
