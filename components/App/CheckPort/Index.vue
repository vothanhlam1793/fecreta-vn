<template>
    <div>
        <h1>Kiểm tra NAT-PORT</h1>
        <IPWAN @updateIPWAN="updateIPWAN" />
        <b-form @submit.prevent="checkPortHttpRequest">
            <b-form-group label="Host" label-for="host-input">
                <b-form-input id="host-input" v-model="host" required @keydown="result.state = 'idle'"></b-form-input>
            </b-form-group>
            <b-form-group label="Port" label-for="port-input">
                <b-form-input id="port-input" type="number" v-model.number="port" required
                    @keydown="result.state = 'idle'"></b-form-input>
            </b-form-group>
            <b-button @click="checkPortHttpRequest" variant="primary">Kiểm tra</b-button>
            <div v-if="result.state !== 'idle'" class="mt-3">
                <b-alert :variant="result.open ? 'success' : 'danger'" show>
                    {{ host }} : {{ port }} - {{ result.open ? 'OPEN' : 'CLOSED' }}
                </b-alert>
            </div>
        </b-form>
        <b-modal v-model="result.state == 'checking'" title="Thông báo" hide-footer centered>
            <div class="text-center">
                <p class="my-4">Vui lòng đợi trong khi chúng tôi kiểm tra cổng.</p>
                <b-spinner variant="primary" type="grow"></b-spinner>
            </div>
        </b-modal>
    </div>
</template>

<script>
import IPWAN from './GetIPClient.vue';
export default {
    components: {
        IPWAN,
    },
    data() {
        return {
            connected: false,
            result: {
                open: false,
                state: 'idle'
            },
            host: "",
            port: 80
        }
    },
    mounted() {
    },
    methods: {
        updateIPWAN(host) {
            this.host = host;
        },
        async checkPortHttpRequest() {
            // https://shop1.creta.vn/check-port?host=mamnonngochoang3.kbvision.tv&port=8888
            this.result.state = 'checking';
            const response = await this.$axios.get(`https://shop1.creta.vn/check-port?host=${this.host}&port=${this.port}`);
            console.log(response.data);
            this.result.open = response.data.open;
            this.result.state = 'done';

        }
    },
    beforeDestroy() {
        if (this.ws) {
            this.ws.close();
        }
    }
}
</script>