<template>
    <b-row>
        <b-col>
            <PageTemplate :content="blogs.data[0]" />
        </b-col>
    </b-row>
</template>
<script>
import gql from 'graphql-tag';
import PageTemplate from '~/components/Content/Page.vue';
export default {
    head() {
        return {
            title: "CRETA - Bảo mật thông tin",
        }
    },
    components: {
        PageTemplate,
    },
    apollo : {
        blogs: {
            query: gql`
            query {
                blogs(filters: {
                    slug: {
                            eq: "bao-mat-thong-tin"
                        }
                }) {
                    data {
                    attributes {
                        categories {
                        data {
                            attributes {
                            description
                            slug
                            title
                            }
                        }
                        }
                        content
                        slug
                        title
                    }
                    id
                    }
                }
            }
            `
        }
    }
}
</script>

<style>

</style>