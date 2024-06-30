<template>
    <div>
        <CheckPort />
    </div>
</template>

<script>
import CheckPort from '~/components/App/CheckPort/Index.vue';
export default {
    components: {
        CheckPort,
    },
    data() {
        return {
            count: 0
        }
    },
    created() {
        console.log("CREATED");
    },
    mounted() {
    }
}
</script>