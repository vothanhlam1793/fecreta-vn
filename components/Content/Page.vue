<template>
    <b-row>
        <b-col class="ck-content">
            <h2>{{ content.attributes.title }}</h2>
            <div v-html="content.attributes.content">

            </div>
        </b-col>
    </b-row>
</template>
<script>
export default {
    props: ['content']
}
</script>