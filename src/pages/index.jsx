import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { graphql } from 'gatsby';

import './main-page.scss';

const IndexPage = ({ data }) => {
    const articles = data.allStrapiArticle.edges;
    return (
        <Layout>
            <SEO title="Home" />
            {articles.map(({ node }) => (
                <>
                    <div className='article-list-item'>
                        <a
                            className="article-list-item__title"
                            href={`/${node.fields.slug}`}
                        >
                            <h2>
                                {node.title}
                            </h2>
                        </a>
                        <p>
                            {node.excerpt}
                        </p>
                        <p className="article-list-item__created-at">
                            {node.fields.createdAtMsk}
                        </p>
                    </div>
                    <hr/>
                </>
            ))}
        </Layout>
    );
};

export default IndexPage;

export const query = graphql`
    {
        allStrapiArticle(
            limit: 10,
            filter: {hidden: {eq: false}},
            sort: {fields: created_at, order: DESC}
        ) {
            edges {
                node {
                    excerpt
                    fields {
                        createdAtMsk
                        slug
                    }
                    title
                }
            }
        }
    }
`;
