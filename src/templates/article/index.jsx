import React from 'react';
import Img from 'gatsby-image';
import Layout from '../../components/layout';
import { graphql } from 'gatsby';

import './article.scss';

export default ({ data }) => {
    const article = data.strapiArticle;
    return (
        <Layout>
            <h1>
                {article.title}
            </h1>
            <p className="article__created-at">
                {article.fields.createdAtMsk}, {article.author.firstname}
            </p>
            <p className="article__excerpt">
                {article.excerpt}
            </p>
            <Img
                fixed={article.cover.childImageSharp.fixed}
                alt={article.title}
            />
            <div dangerouslySetInnerHTML={{ __html: article.fields.htmlContent }} />
        </Layout>
    );
};

export const query = graphql`
    query($slug: String!) {
        strapiArticle(fields: { slug: { eq: $slug } }) {
            title
            excerpt
            fields {
                createdAtMsk
                slug
                htmlContent
            }
            author {
                firstname
                lastname
            }
            cover {
                childImageSharp {
                    fixed(height: 250) {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
        }
    }
`;
