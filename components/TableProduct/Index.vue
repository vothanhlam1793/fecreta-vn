<template>
    <b-row>
        <b-col v-if="show"> 
            <h3>{{ tableProduct.attributes.title }}</h3>
            <b-table 
            striped
            hover
            bordered 
            small
            :items="items"
            :fields="fields"            
            >
                <template v-slot:cell(image)="data">
                    <b-img
                        thumbnail
                        fluid
                        :src="data.item.image"
                        alt="Image 1"
                    ></b-img>
                </template>
                <template v-slot:cell(price)="data">
                    <p>{{ data.item.price }}</p>
                </template>
                <template v-slot:cell(name)="data">
                    <div class="product-info">
                        <a>{{ data.item.name }}</a>
                    </div>
                </template>
                <template v-slot:cell()="data">
                    <b-button variant="primary">
                        Mua hàng
                    </b-button>
                </template>
            </b-table>
        </b-col>
        <b-col v-else>
            <b-alert variant="info">
                {{ notify }}
            </b-alert>
        </b-col>
    </b-row>
</template>
<script>
import gql from 'graphql-tag';
export default {
    props: {
        id: {
            type: String,
            default: "1"
        }
    },
    created(){
        if(process.client){
            this.getTableProduct(this.id);
        }
    },
    data(vm) {
        return {
            show: false,
            tableProduct: {},
            notify: "Đang tải dữ liệu...",
            items: [],
            fields: [
                { key: 'image', label: 'Hình ảnh',       thStyle: { width: "10%" },class: 'text-center' },
                { key: 'name', label: 'Tên sản phẩm', thStyle: { width: "70%" }, thClass: 'text-center',tdClass: 'pl-3 align-middle'},
                { key: 'price', label: 'Giá', thStyle: { width: "20%" }, class: 'text-center', tdClass: 'align-middle' },
            ],   
        }
    },
    computed: {
        url_be() {
            return process.env.BACKEND_URL_IMAGE;
        },
        url_no_image() {
            return process.env.NO_IMAGE;
        }
    },
    methods: {
        createItems(){
            console.log(this.id, this.tableProduct);
            var that = this;
            this.tableProduct.attributes.ItemProduct.forEach((item) => {
                that.items.push({
                    image: item.image.data ? that.url_be + item.image.data.attributes.url : 
                    item.product.data ? that.url_be + item.product.data.attributes.imagePresent.data.attributes.url : that.url_no_image,
                    name: item.name ? item.name : item.product.data.attributes.name,
                    price: (item.price ? item.price : item.product.data.attributes.price).toLocaleString('vi-VN', {
                            style:
                                'currency', currency: 'VND'
                        })
                });
            });
        },
        async getTableProduct(id){
            var client = this.$apolloProvider.defaultClient;
            var { data } = await client.query({
                query: gql`
                query{
                    tableProduct(id: "${id}") {
                        data {
                        id
                        attributes {
                            endDate
                            startDate
                            title
                            ItemProduct {
                            name
                            price
                            image {
                                data {
                                attributes {
                                    url
                                }
                                }
                            }
                            product {
                                data {
                                id
                                attributes {
                                    imagePresent {
                                    data {
                                        attributes {
                                        url
                                        }
                                    }
                                    }
                                    price
                                    name
                                }
                                }
                            }
                            id
                            }
                        }
                        }
                    }
                }`
            });
            // console.log("DATA: ", data);
            if(data.tableProduct.data){
                this.tableProduct = data.tableProduct.data;
                this.createItems();
                this.show = true;
            } else {
                this.notify = "Không tìm thấy sản phẩm!"
            }
        }
    }

}
</script>