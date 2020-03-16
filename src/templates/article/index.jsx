import React from 'react';
import Layout from '../../components/layout';
import { graphql } from 'gatsby';

export default ({ data }) => {
    const fields = Object.keys(data.strapiArticle);
    return (
        <Layout>
            <div>
                {fields.map(field => (
                    <p>
                        <strong>
                            {field}
                        </strong>
                        : {data.strapiArticle[field]}
                    </p>
                ))}
            </div>
        </Layout>
    );
};

export const query = graphql`
    query($slug: String!) {
        strapiArticle(fields: { slug: { eq: $slug } }) {
            title
            excerpt
            content
          }
    }
`;

// fields {
//     createdAtMsk
//     slug
// }
// author {
//     firstname
//     lastname
// }
// cover {
//     childImageSharp {
//         fluid {
//             ...GatsbyImageSharpFluid
//         }
//     }
// }
