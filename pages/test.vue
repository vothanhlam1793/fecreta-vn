<template>
    <div>
        <h1>Hello World</h1>
        <p>{{ count }}</p>
    </div>
</template>

<script>
import TableProduct from '~/components/TableProduct/Index.vue';
export default {
    components: {
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
            console.log("MOUNTED");
    }
}
</script>