import { gql } from 'graphql-tag';
export default (context, inject) => {
    inject('getBlogs', async function (category) {
        try {
            var client = context.app.apolloProvider.defaultClient;
            var {data} = await client.query({
                query: gql`
                    query {
                    blogs(filters: {
                        categories: {
                            title: {
                                eq: "${category}"
                            }
                        }
                    }) {
                        data {
                            id
                        attributes {
                            content
                            createdAt
                            publishedAt
                            slug
                            title
                            updatedAt
                            shortDescription
                            imagePresent {
                                data {
                                    attributes {
                                    url
                                    }
                                }
                            }
                            categories {
                            data {
                                attributes {
                                title
                                }
                            }
                            }
                        }
                        }
                    }
                    }
                `
            });
            return data.blogs;
        } catch (e) {
            console.log(e);
        }
    }),
    inject('getBlogsBySlug', async function (slug) {
        try {
            var client = context.app.apolloProvider.defaultClient;
            var {data} = await client.query({
                query: gql`
                    query {
                    blogs(filters: {
                        slug: {
                                eq: "${slug}"
                            
                        }
                    }) {
                        data {
                            id
                        attributes {
                            content
                            createdAt
                            publishedAt
                            slug
                            title
                            updatedAt
                            shortDescription
                            imagePresent {
                                data {
                                    attributes {
                                    url
                                    }
                                }
                            }
                            categories {
                            data {
                                attributes {
                                title
                                }
                            }
                            }
                        }
                        }
                    }
                    }
                `
            });
            return data.blogs;
        } catch (e) {
            console.log(e);
        }
    })
}