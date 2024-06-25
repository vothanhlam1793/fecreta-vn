<template>
    <b-row> 
        <b-col>
            <h1>{{ technical.data.attributes.title }}</h1>
            <b-row>
                <b-col>
                    <ListBlog 
                        category="Blog"
                    />
                </b-col>
            </b-row>
        </b-col>
    </b-row>
</template>

<script>
import gql from 'graphql-tag';
import ListBlog from '~/components/Blog/List/Index.vue'
export default {
    head() {
        return {
            title: "CRETA - Bài biết - Blogs - Công nghệ",
        }
    },
    components: {
        ListBlog
    },
    created(){

    },
    mounted(){
        this.controlNotify();
    },
    methods: {
        controlNotify(){
            this.$nuxt.$emit('enableNofifyChanged', this.technical.data.attributes.enableNotify);
        }
    },
    apollo: {
        technical: {
            query: gql`
                query {
                    technical {
                        data {
                            id
                            attributes {
                                title
                                enableNotify
                            }
                        }
                    }
                }
            `
        }
    }
}
</script>