<template>
    <div class="row">
        <div class="col">
            <b-form-input v-model="text" placeholder="Tìm sản phẩm" @keyup="searchProduct()"
                ref="searchInput"
                @keyup.enter="redirectUrl"
            ></b-form-input>
            <b-row>
                <b-col class="text-center">
                    <p>Giờ mở cửa: Thứ 2~7: 7:30~17:30 | CN: Nghỉ</p>
                </b-col>
            </b-row>
            <b-list-group
            class="custom-list-group"
            :style="{ width: listWidth }"
            >
                <b-list-group-item
                    v-for="product in products.slice(0,5)"
                    :key="product.id"
                    v-if="isListVisible"
                    @click="handleItemClick"
                    :href="`/products/${product.slug}`"
                >
                <div class="d-flex align-items-center">
                    <b-avatar variant="info" :src="product.imagePresent ? url_be + product.imagePresent.url : url_be + url_no_image" class="mr-3"></b-avatar>
                    <div>
                    <div>{{ product.name }}</div>
                    <div>{{ product.priceInstall ? product.priceInstall.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 0 }}</div>
                    </div>
                </div>
                </b-list-group-item>
                <b-list-group-item
                    v-if="isListVisible && products.length > 5"
                    class="see-more-button"
                    :href="`/search/${encodeURIComponent(text)}`"
                >
                    <i class="fas fa-chevron-down"></i> Xem thêm
                </b-list-group-item>
            </b-list-group>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        // Lắng nghe sự kiện click trên phần tử body
        document.body.addEventListener("click", this.handleBodyClick);
    },
    beforeDestroy() {
        // Hủy lắng nghe sự kiện khi component bị hủy
        document.body.removeEventListener("click", this.handleBodyClick);
    },
    computed: {
        search_host(){
            return process.env.SEARCH_HOST;
        },
        search_key(){
            return process.env.SEARCH_KEY;
        },
        url_be(){
            return process.env.BACKEND_URL_IMAGE;
        },
        url_no_image(){
            return process.env.NO_IMAGE;
        }
    },
    head(){
        return {
            script: [
                { src: "https://cdn.jsdelivr.net/npm/meilisearch@latest/dist/bundles/meilisearch.umd.js"}
            ],
        }
    },
    data(){
        return {
            text: "",
            products: [],
            isListVisible: false,
            listWidth: "auto"
        }
    },
    methods: {
        redirectUrl() {
            if (this.text.trim() !== "") {
                // Chuyển hướng đến trang /search/<nội dung text>
                this.$router.push({ path: `/search/${encodeURIComponent(this.text)}` });
                this.isListVisible = false;
                // Nếu bạn muốn xóa nội dung trong input sau khi nhấn Enter
                this.text = "";
            }
        },
        handleBodyClick(event){
            const isClickInside = this.$el.contains(event.target);
            if (!isClickInside) {
                this.hideList();
            } else {
                this.showList();
            }
        },
        setListWidth() {
            const inputWidth = this.$refs.searchInput.$el.clientWidth; // Lấy chiều rộng của input
            this.listWidth = `${inputWidth}px`; // Đặt chiều rộng của list bằng chiều rộng của input
        },
        showList() {
            // console.log("SHOW");
            this.isListVisible = true;
            this.setListWidth(); // Gọi hàm để cập nhật chiều rộng của list
        },
        hideList() {
        // You can add additional logic if needed
            this.isListVisible = false;
        },
        async searchProduct(name){
            if(this.text.length > 0 ){
                this.products = [];
            } else {
                return;
            }
            this.isListVisible = true;
            // console.log("SEARCH: ", this.text);
            const client = new MeiliSearch({
                host: this.search_host,
                apiKey: this.search_key,
            })
            var index = client.index("product");
            let res = await index.search(this.text);
            this.products = res.hits;
            // console.log(this.products)
        },
        handleItemClick(event) {
            // Prevent the click event from bubbling up to the parent (b-list-group)
            event.stopPropagation();
        },
    },
}
</script>

<style>
.custom-list-group {
    z-index: 100; /* Đặt giá trị z-index tùy theo nhu cầu */
    position: absolute; /* Đảm bảo hiển thị đúng vị trí trên trang */
}
</style>