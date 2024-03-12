<template>
    <div class="row">
        <div class="col">
            <div v-html="content">

            </div>
        </div>
    </div>
</template>
<script>
const imageUrl = process.env.BACKEND_URL_1 + '/image/1.png';
export default {
    props:['content'],
}
</script>