<template>
    <div class="row mb-2" v-if="menu">
        <div class="col">
            <b-button @click="toggleShow()" variant="primary" class="w-100 d-flex justify-content-between align-items-center">
                <span class="text-left">{{ menu.menu.data.attributes.title }}</span>
                <b-icon :icon="show ? 'chevron-up' : 'chevron-down'"></b-icon>
            </b-button>

            <b-collapse :visible="show">
                <b-list-group>
                    <b-list-group-item
                        v-for="item in menu.menu.data.attributes.items"
                        :key="item.id"
                        :href="item.url ? item.url : '#'"
                    >{{ item.title }}</b-list-group-item>
                </b-list-group>
            </b-collapse>
            
        </div>
    </div>
    <div class="row mb-2" v-else></div>
</template>

<script>
export default {
    props: ['menu'],
    data(){
        return {
            show: true
        }
    },
    methods: {
        toggleShow(){
            if(this.show){
                this.show = false;
            } else {
                this.show = true;
            }
        }
    }
}
</script>