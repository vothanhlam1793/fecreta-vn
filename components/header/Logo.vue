<template>
    <a href="/">
        <b-img center v-bind="mainProps" :src="url" fluid alt="Responsive image" ></b-img>
    </a>
</template>
<script>
const imageUrl = process.env.BACKEND_URL_1 + '/image/1.png';
export default {
    props:['url'],
    data(){
        return {
            mainProps: {
                width: 75,
                height: 75
            },
        }
    },
}
</script>