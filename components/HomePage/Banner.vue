<template>
    <div>
        <b-carousel
            id="carousel-fade"
            style="text-shadow: 0px 0px 2px #000"
            fade
            indicators
            img-width="1024"
            img-height="480"
            :interval="3000"
        >
            <b-carousel-slide 
                v-for="image in banner.attributes.items"
                :key="image.index"
                :img-src="url_be + image.image.data.attributes.url"
            >

            </b-carousel-slide>
        </b-carousel>
    </div>
</template>

<script>
export default {
    props: ['banner'],
    computed: {
        url_be(){
            return process.env.BACKEND_URL_IMAGE;
        }
    },
}
</script>