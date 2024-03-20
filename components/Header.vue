<template>
    <div class="row mt-2 mb-2">
        <div class="col" v-if="header.data">
            <div class="row">
                <div class="col-12 col-md-2 p-2">
                    <Logo :url="url_be + header.data.attributes.logo.data.attributes.url"/>
                </div>
                <div class="col-12 col-md-7 p-2">
                    <Search />
                </div>
                <div class="col-3 d-none d-md-block p-2">
                    <Info :content="header.data.attributes.info" />
                </div>
            </div>
            <div class="row"
            >
                <div class="col"
                >
                    <Menu :menus="header.data.attributes.menu"/>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <Notify />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import gql from 'graphql-tag';
import Logo from '~/components/header/Logo.vue'
import Info from '~/components/header/Info.vue'
import Search from '~/components/Search/Index.vue'
import Menu from '~/components/header/Menu.vue'
import Notify from '~/components/header/Notify.vue'
export default {
    computed: {
        url_be(){
            return process.env.BACKEND_URL_IMAGE;
        }
    },
    components: {
        Logo,
        Info,
        Search,
        Menu,
        Notify
    },
    apollo: {
        header: {
            query: gql`
            query {
                header {
                    data {
                    attributes {
                        menu {
          data {
            attributes {
              title
              items {
                id
                title
                url
                index
              }
              createdAt
              updatedAt
              publishedAt
            }
          }
        }
                        logo {
                        data {
                            id
                            attributes {
                                url
                            }
                        }
                        }
                        info
                        createdAt
                        updatedAt
                        publishedAt
                    }
                    }
                }
            }
            `
        }
    }
}
</script>