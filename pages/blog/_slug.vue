<template>
    <b-row class="ck-content">
        <b-col v-if="show">
            <b-row>
                <b-col>
                    <h3>{{ blog.attributes.title }}</h3>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <div v-html="blog.attributes.content">

                    </div>
                </b-col>
            </b-row>
        </b-col>
        <b-col v-else>

        </b-col>
    </b-row>
</template>
<script>
export default {
    created(){
        this.getBlogsBySlug();
    },
    data(){
        return {
            blog: {},
            show: false
        }
    },
    methods: {
        async getBlogsBySlug(){
            var data = await this.$getBlogsBySlug(this.$route.params.slug);
            if(data.data.length > 0){
                this.blog = data.data[0];
                this.show = true;
            }
            // console.log(this.blog, this.$route.params.slug);
        }
    }
}
</script>