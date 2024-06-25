import { gql } from 'graphql-tag';
export default (context, inject) => {
    inject('getProductsWithCategorySlug', async function (categorySlug, page=1, pageSize=30) {
        try {
            var client = context.app.apolloProvider.defaultClient;
            var {data} = await client.query({
                query: gql`

                    query ExampleQuery($pagination: PaginationArg, $filters: ProductFiltersInput) {
                    products(pagination: $pagination, filters: $filters) {
                        meta {
                        pagination {
                            pageSize
                            page
                            pageCount
                            total
                        }
                        }
                        data {
                        id
                        attributes {
                            price
                            code
                            name
                            imagePresent {
                            data {
                                id
                                attributes {
                                url
                                formats
                                }
                            }
                            }
                            priceDealer
                            priceInstall
                            pricePromotion
                            slug
                        }
                        }
                    }
                    }

                `,
                variables: {
                    "pagination": {
                      "page": page,
                      "pageSize": pageSize
                    },
                    "filters": {
                      "categories": {
                        "slug": {
                          "eq": categorySlug
                        }
                      }
                    }
                }
            });
            return data.products;
        } catch (e) {
            console.log(e);
        }   
    });
};