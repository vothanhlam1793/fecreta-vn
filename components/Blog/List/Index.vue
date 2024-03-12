<template>
    <b-row>
        <b-col>
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
            blogs: []
        }
    },
    methods: {
        async getBlogs(){
            this.blogs = await this.$getBlogs(this.category);

        }
    },
    created(){
        this.getBlogs();
    }
}
</script>