<template>
    <div class="row">
        <div class="col">
            <b-navbar variant="primary" type="dark">
                <b-navbar-nav>
                    <b-nav-item 
                    v-for="item in lists"
                    :key="item.id"
                    :href="item.url">{{item.title}}</b-nav-item>
                </b-navbar-nav> 
            </b-navbar>
        </div>
    </div>
</template>

<script>
export default {
    props: ['menus'],
    data(){
        return {
            lists: []
        }
    },
    methods: {
        handleMenusChange(){
            var menus = this.menus.data.attributes.items;
            for(var i = 0; i < menus.length; i++){
                this.lists.push(menus[i]);
            }
            this.lists.sort((a,b) => parseInt(a.index) - parseInt(b.index));
        }
    },
    created(){
        this.handleMenusChange();
    }    
}
</script>