<template>
    <div>
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
    async mounted() {
        try {
            const response = await this.$axios.get('https://api.ipify.org?format=json');
            this.wanIp = response.data.ip;
            this.$emit('updateIPWAN', this.wanIp);
        } catch (error) {
            console.error('Failed to fetch WAN IP:', error);
        }
    }
};
</script>