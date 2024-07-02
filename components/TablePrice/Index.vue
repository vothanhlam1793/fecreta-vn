<template>
    <div>
        <Table :products="products" title="Bảng giá"></Table>
    </div>
</template>

<script>
import Table from './Table.vue'
export default {
    props: ['products'],
    components: {
        Table
    }
}
</script>