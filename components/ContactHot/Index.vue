<template>
    <div class="contact-hot p-2 rounded" 
        v-show="enablePage && show"
    >
        <div v-show="isMobile">
            <div class=""
                v-show="mobileShow == false"
            >
                <a 
                    v-for="contact in footer.data.attributes.contactHot"
                    class="my-2 text-left"
                    @click="openContactModal"
                    :key="contact.id"
                    :href="'tel:' + contact.phoneNumber">
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
            <div class="contact-hot-mobile" @click="mbshow()">
                <div style="font-size: 3rem;">
                    <b-icon icon="telephone-fill" class="rounded-circle bg-danger p-2" variant="light"
                    animation="fade"
                    ></b-icon>
                </div>
            </div>
        </div>
        <div v-show="isMobile == false">
                <a :href="'tel:' + contact.phoneNumber"
                    v-for="contact in footer.data.attributes.contactHot"
                    class="my-2 text-left"
                    @click="openContactModal"
                    :key="contact.id"
                >
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

        // Đoạn này dùng để tạo emit/on trên toàn nuxt app
        this.$nuxt.$on('enableContactHotChanged', (state) => {
            that.enablePage = state;
        });

        if(process.client){
            this.checkMobile();
            window.addEventListener('resize', this.checkMobile);
        }
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
            show: true,
            isMobile: false,
            mobileWidth: 768,
            mobileShow: true,
        }
    },
    methods: {
        mbshow(){
            this.mobileShow = !this.mobileShow;
        },
        openContactModal(){
            // console.log("Hello World");
        },
        checkMobile() {
            this.isMobile = window.innerWidth <= 768;
        },
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
    bottom: 50px;
    right: 10px;
    z-index: 10;
}

.contact-hot-mobile {
    position: fixed;
    width: 5em;
    bottom: 3px;
    right: 2px;
    z-index: 10;
}
</style>