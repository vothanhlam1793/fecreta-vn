<template>
    <div class="contact-hot p-2 rounded" 
        v-if="enablePage && show"
    >
        <div
            v-for="contact in footer.data.attributes.contactHot"
            class="my-2 text-left"
            @click="openContactModal"
            :key="contact.id"
        >
        <a :href="'tel:' + contact.phoneNumber">
            <b-alert
                show
                :variant="contact.variant ? contact.variant : info"
            >
                <b-icon
                    icon="telephone-fill" 
                    :variant="contact.variant ? contact.variant : info"
                    font-scale="1"
                    animation="fade"
                />
                {{ contact.name }}
                </b-alert>
                </a>
        </div>
    </div>    
</template>
<script>
import gql from 'graphql-tag';
export default {
    created(){
        var that = this;
        this.$nuxt.$on('enableContactHotChanged', (state) => {
            that.enablePage = state;
        });
    },
    watch: {
        footer(){
            // console.log(this.footer.data.attributes)
            this.show = this.footer.data.attributes.enableContactHot;
        }
    },
    data() {
        return {
            enablePage: true, // Cai nay danh cho page dieu khien hot, neu muon tat
            show: true
        }
    },
    methods: {
        openContactModal(){
            // console.log("Hello World");
        }
    },
    apollo: {
        footer: {
            query: gql`
                query Footer {
                    footer {
                        data {
                        attributes {
                            enableContactHot
                            contactHot {
                                variant
                                name
                                phoneNumber
                                id
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
<style>
.contact-hot {
    position: fixed;
    width: 10em;
    bottom: 10px;
    right: 10px;
    z-index: 10;
}
</style>