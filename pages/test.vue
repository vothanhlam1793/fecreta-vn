<template>
    <div>
        <CalculateHdd />
    </div>
</template>

<script>
import CalculateHdd from '~/components/App/CalculateHdd/Index.vue';
export default {
    components: {
        CalculateHdd,
    },
    data(){
        return {
            count: 0
        }
    },
    created(){
            console.log("CREATED");
    },
    mounted(){
    }
}
</script>