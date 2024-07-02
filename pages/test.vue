<template>
    <div class="row">
        <div class="col">
            <div v-if="(products.length > 0) && (products.length == total)">
                <TablePrice :products="products" />
            </div>
            <div v-else>
                <b-spinner variant="primary" type="grow" label="Spinning"></b-spinner>
            </div>
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag';
import _ from "lodash";
import TablePrice from '~/components/TablePrice/Index.vue';

export default {
    components: {
        TablePrice,
    },
    created() {
        this.category = "Bảng giá";
    },
    data() {
        return {
            total: 0,
            pageSize: 100,
            products: [],
            category: "Bảng giá"
        }
    },
    methods: {
        lodashProduct(n) {
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
            return products;
        },
        genGraphQLProducts(category, page, pageSize) {
            var that = this;
            this.filter = `{
                categories: {
                    name: {
                        eq: "${category}"
                    }
                }
            }`;
            this.pagination = `
            {
                page: ${page},
                pageSize: ${pageSize}
            }`
            var query = `
                    query{
                        products(
                            filters: ${that.filter},
                            pagination: ${that.pagination}
                        ){
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
                            meta {
                                pagination {
                                    total
                                    pageSize
                                    pageCount
                                    page
                                }
                            }
                        }
                    }
                `;
            return query;
        },
        fetchProductWithPage(page) {
            var that = this;
            var str = this.genGraphQLProducts(this.category, page, this.pageSize);
            that.$apollo.query({
                query: gql(str)
            }).then(result => {
                var products = that.lodashProduct(result.data.products);
                that.products = that.products.concat(products);
                that.$forceUpdate();
            }).catch(error => {
                console.error("Error fetching products:", error);
            });
        },
        fetchProducts(page) {
            var that = this;
            var maxPage = Math.floor(this.total / this.pageSize) + 1;
            for (var i = 1; i <= maxPage; i++) {
                this.fetchProductWithPage(i);
            }
        },
        async getTotal() {
            var that = this;
            var cat = '';
            if (this.category) {
                cat = `filters: {
                                categories: {
                                    name: {
                                        eq: "${this.category}"
                                    }
                                }
                            }`
            } else {
                cat = "";
            }
            if (cat != "") {
                cat = `(${cat})`;
            }
            var str = `
                    query {
                        products ${cat} {
                            meta {
                                pagination {
                                    total
                                    pageSize
                                    pageCount
                                    page
                                }
                            }
                        }
                    }
                `
            var response = await this.$apollo.query({
                query: gql(str)
            });
            that.total = response.data.products.meta.pagination.total;
            that.fetchProducts();
        }
    },
    mounted() {
        this.getTotal(this.category);
    }
}
</script>
