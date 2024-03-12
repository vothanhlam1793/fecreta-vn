<template>
    <div>
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
    props: ['menus'],
    components: {
        Menu
    },
    apollo: {
        
    }
}
</script>