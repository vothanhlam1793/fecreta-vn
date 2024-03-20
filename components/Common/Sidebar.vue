<template>
    <div v-if="show">
        <Menu 
            v-for="menu in menus.attributes.menus"
            :key="menu.id"
            :menu="menu"
        />
    </div>
</template>

<script>
import gql from 'graphql-tag';
import Menu from '~/components/HomePage/MenuSidebar.vue';
export default {
    props: ['id'],
    data(){
        return {
            menus: [],
            show: false
        }
    },
    methods: {
        async fetchSidemenu() {
            var that = this;
            var client = this.$apolloProvider.defaultClient;
            await client.query({
                query: gql`
                query  {
                sidemenu(id: "${this.id}") {
                    data {
                    id
                    attributes {
                        title
                        type
                        menus {
                        index
                        menu {
                            data {
                            attributes {
                                title
                                items {
                                index
                                title
                                url
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
                }
                }
                `
            }).then((response) => {
                that.menus = response.data.sidemenu.data;
                that.show = true;
            }).catch(err => {
                console.log(err);
            })
        }
    },
    components: {
        Menu
    },
    created(){
        this.fetchSidemenu();
    }
}
</script>