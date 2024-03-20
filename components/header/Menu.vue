<template>
    <div class="row">
        <div class="col-12 col-md-12 d-none d-md-block">
            <b-navbar variant="primary" type="light">
                <b-navbar-nav>
                    <b-nav-item 
                    v-for="item in lists"
                    :key="item.id"
                    :href="item.url"
                    type="light"
                    >{{item.title}}</b-nav-item>
                </b-navbar-nav> 
            </b-navbar>
        </div>
        <div class="col-12 d-md-none">
            <b-button v-b-toggle.collapse-1 variant="primary" block class="text-right">
                <b-row>
                    <b-col class="d-flex justify-content-between">
                        <div>Menu</div>
                        <b-icon icon="list" scale="1"></b-icon>
                    </b-col>
                </b-row>
            </b-button>
            <b-collapse id="collapse-1" class="mt-2">
                <b-list-group>
                    <b-list-group-item
                        v-for="item in lists"
                        :key="item.id"
                        :href="item.url"
                    >{{item.title}}</b-list-group-item>
                </b-list-group>
            </b-collapse>
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