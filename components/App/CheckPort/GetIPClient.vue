<template>
    <div>
        <p v-if="wanIp == null">Đang tìm IP</p>
        <p>{{ wanIp }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            wanIp: null
        };
    },
    mounted() {
        // alert("Bắt đầu tìm");
        this.$axios.get('https://shop1.creta.vn/checkIPWan')
            .then(response => {
                // alert("Đã tìm thấy");
                this.wanIp = response.data.ip;
                this.$emit('updateIPWAN', this.wanIp);
            })
            .catch(error => {
                console.error('Failed to fetch WAN IP:', error);
                // alert(error);
            });
    }
};
</script>