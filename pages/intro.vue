<template>
    <b-row>
        <b-col>
            <PageTemplate :content="setup.data.attributes.introduct.data" />
        </b-col>
    </b-row>
</template>
<script>
import gql from 'graphql-tag';
import PageTemplate from '~/components/Content/Page.vue';
export default {
    components: {
        PageTemplate,
    },
    apollo : {
        setup: {
            query: gql`
            query Query {
            setup {
                data {
                attributes {
                    introduct {
                    data {
                        attributes {
                            content
                            title
                        }
                    }
                    }
                }
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