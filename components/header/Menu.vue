<template>
    <b-row>
                <b-col>
                    <b-navbar toggleable="lg" type="dark" variant="primary">

                    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                    <b-collapse id="nav-collapse" is-nav>
                        <b-navbar-nav>
                            <b-nav-item
                                v-for="item in lists"
                                :key="item.id"
                                :href="item.url"
                                :target="item.target"
                            >
                                {{ item.title }}
                            </b-nav-item>
                        </b-navbar-nav>

                    <!-- Right aligned nav items -->
                    </b-collapse>
                </b-navbar>
                </b-col>
                </b-row>
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