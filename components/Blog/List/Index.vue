<template>
    <b-row>
        <b-col v-if="show">
            <ItemBlog 
                v-for="blog in blogs.data"
                :blog="blog"
                :key="blog.id"
            />
        </b-col>
    </b-row>
</template>
<script>
import ItemBlog from '~/components/Blog/List/Item.vue';
export default {
    components: {
        ItemBlog,
    },
    props: {
        category: {
            type: String,
            default(){
                return "Blog"
            }
        }
    },
    data(){
        return {
            blogs: [],
            show: false
        }
    },
    methods: {
        async getBlogs(){
            this.blogs = await this.$getBlogs(this.category);
            this.show = true;
        }
    },
    created(){
        if(process.client){
            this.getBlogs();
        }
    }
}
</script>