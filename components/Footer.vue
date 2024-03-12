<template>
    <div class="row">
        <div class="col">
            <hr>
            <div class="row">
                        <div class="col-12 col-md-6 col-lg-3">
                            <b-row v-if="footer.data.attributes.item[0].type == 'menu'">
                                <b-col>
                                    <Menu :items="{ 
                                        title: footer.data.attributes.item[0].title,
                                        items: footer.data.attributes.item[0].menu 
                                    }" />
                                </b-col>
                            </b-row>
                            <b-row v-else>
                                <b-col>
                                    <div v-html="footer.data.attributes.item[0].description">

                                    </div>
                                </b-col>
                            </b-row>
                        </div>
                        <!--  -->
                        <div class="col-12 col-md-6 col-lg-3">
                            <b-row v-if="footer.data.attributes.item[1].type == 'menu'">
                                <b-col>
                                    <Menu :items="{ 
                                        title: footer.data.attributes.item[1].title,
                                        items: footer.data.attributes.item[1].menu 
                                    }" />
                                </b-col>
                            </b-row>
                            <b-row v-else>
                                <b-col>
                                    <div v-html="footer.data.attributes.item[1].description">

                                    </div>
                                </b-col>
                            </b-row>
                        </div>
                        <!--  -->
                        <div class="col-12 col-md-6 col-lg-3">
                            <b-row v-if="footer.data.attributes.item[2].type == 'menu'">
                                <b-col>
                                    <Menu :items="{ 
                                        title: footer.data.attributes.item[2].title,
                                        items: footer.data.attributes.item[2].menu 
                                    }" />
                                </b-col>
                            </b-row>
                            <b-row v-else>
                                <b-col>
                                    <div v-html="footer.data.attributes.item[2].description">

                                    </div>
                                </b-col>
                            </b-row>
                        </div>
                        <!--  -->
                        <div class="col-12 col-md-6 col-lg-3">
                            <b-row v-if="footer.data.attributes.item[3].type == 'menu'">
                                <b-col>
                                    <Menu :items="{ 
                                        title: footer.data.attributes.item[3].title,
                                        items: footer.data.attributes.item[3].menu 
                                    }" />
                                </b-col>
                            </b-row>
                            <b-row v-else>
                                <b-col>
                                    <div v-html="footer.data.attributes.item[3].description">

                                    </div>
                                </b-col>
                            </b-row>
                        </div>
                    </div>
            <div class="row my-2">
                <div class="col">
                    <div class="alert alert-primary d-flex align-items-center justify-content-center">
                        <p>{{ footer.data.attributes.endLine }}</p>
                    </div>
                </div>
            </div>
        </div>
        <ContactHot />
    </div>
</template>

<script>
import Menu from '~/components/footer/Menu.vue'
import ContactHot from '~/components/ContactHot/Index.vue'
import gql from 'graphql-tag';
export default {
    components: {
        Menu,
        ContactHot
    },
    apollo: {
        sidemenus: {
            query: gql`
            query{
            sidemenus(filters: {
                type: {
                    eq: "footer"
                }
            }) {
                data {
                attributes {
                    title
                    type
                    menus {
                    index
                    menu {
                        data {
                        attributes {
                            items {
                            index
                            title
                            url
                            id
                            }
                            title
                        }
                        id
                        }
                    }
                    id
                    }
                }
                id
                }
            }
            }
            `
        },
        footer: {
            query: gql`
            query Query {
  footer {
    data {
      attributes {
        endLine
        item {
          description
          id
          menu {
            data {
              attributes {
                items {
                  title
                  url
                  index
                }
                title
              }
              id
            }
          }
          title
          type
        }
        title
      }
    }
  }
}
            
            `
        }
    }
}
</script>