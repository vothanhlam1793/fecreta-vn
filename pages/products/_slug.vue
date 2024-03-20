<template>
    <div class="row">
        <div class="col-12 col-md-3 d-none d-md-block">
            <SideBar :menus="sidemenus.data[0]" />
        </div>
        <div class="col-12 col-md-9">
            <div class="row">
                <div class="col-12 col-lg-6">
                    <ImageProduct :images="products.data[0].attributes.image.data.length > 0 ? products.data[0].attributes.image : {data: [products.data[0].attributes.imagePresent.data]} " :urlBackend="url_be" />
                </div>
                <div class="col-12 col-lg-6">
                    <h4>{{ products.data[0].attributes.name }}</h4>
                    <hr>
                    <div v-if="checkPromotion(products.data[0])">
                        <h6>Giá đang khuyến mãi:</h6>
                        <h1 class="text-danger">{{ products.data[0].attributes.pricePromotion.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }}</h1>
                        <h6 class="text-danger" style="text-decoration: line-through;">{{ products.data[0].attributes.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }}</h6>
                    </div>
                    <div v-else>
                        <h6>Giá bán:</h6>
                        <h2 class="text-danger">{{ products.data[0].attributes.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }}</h2>
                    </div>
                    <hr>
                    <h6>Mô tả ngắn:</h6>
                    <div v-html="products.data[0].attributes.descriptionShort">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <hr>
                    <b-tabs content-class="mt-3">
                        <b-tab title="Mô tả sản phẩm" active>
                            <div v-html="products.data[0].attributes.description">

                            </div>
                        </b-tab>
                    </b-tabs>
                </div>
            </div>
            <hr>
            <div class="row">
                <div class="col">
                    <h5>Sản phẩm liên quan</h5>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag';
import ImageProduct from '~/components/Product/Image.vue';
import SideBar from '~/components/HomePage/Sidebar.vue';
export default {
    components: {
        ImageProduct,
        SideBar,
    },
    watch: {
        products(){
            console.log(this.products);
        }
    },
    methods: {
        checkPromotion(product){
            // console.log(product);
            if(product.attributes.pricePromotion){
                var d1 = new Date();
                var start = new Date(product.attributes.pricePromotionStart)
                var end = new Date(product.attributes.pricePromotionEnd)
                // console.log(d1, start, end);
                if((d1 >= start) && (d1 <= end)){
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    },
    data(){
        return {
            url_be: process.env.BACKEND_URL_IMAGE,
        }
    },
    apollo: {
        products: {
            query: gql`
                query ($slug: String!) {
                    products(filters: {
                        slug: {
                            eq: $slug
                        }
                    }) {
                        data {
                        attributes {
                            name
                            slug
                            price
                            pricePromotion
                            pricePromotionStart
                            pricePromotionEnd
                            priceInstall
                            priceWhole {
                            price
                            type
                            }
                            tags {
                            data {
                                attributes {
                                name
                                description
                                }
                            }
                            }
                            code
                            image {
                            data {
                                id
                                attributes {
                                url
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
                            description
                            descriptionShort
                            categories {
                            data {
                                attributes {
                                name
                                description
                                }
                            }
                            }
                            branch {
                            data {
                                attributes {
                                name
                                description
                                }
                            }
                            }
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