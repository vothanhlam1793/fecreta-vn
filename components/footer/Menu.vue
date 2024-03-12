<template>
    <div class="row">
        <div class="col">
            <h5>{{ items.title }}</h5>
            <b-list-group>
                <b-list-group-item 
                    v-for="item in items.items.data.attributes.items"
                    :href="item.url"
                    :key="item.id"
                > {{ item.title }}</b-list-group-item>
            </b-list-group>
        </div>
    </div>
</template>
<script>
export default {
    props: ['items']
}
</script>