const path = require('path');
const moment = require('moment-timezone');
const showdown = require('showdown');
const converter = new showdown.Converter();

const spaceRegexp = / /g;

exports.onCreateNode = ({ node, actions: { createNodeField } }) => {
    if (node.internal.type.startsWith('Strapi')) {
        const createdAtMsk = moment(node.created_at).tz('Europe/Moscow');
        createNodeField({
            node,
            name: 'createdAtMsk',
            value: createdAtMsk.format('DD.MM.YYYY'),
        });
    }

    if (node.internal.type.startsWith('StrapiArticle')) {
        const title = node.title;
        const id = node.strapiId;
        const slug = `${id}-${title.replace(spaceRegexp, '-')}`.toLowerCase();
        createNodeField({
            node,
            name: 'slug',
            value: slug,
        });

        const mdContent = node.content;
        const htmlContent = converter.makeHtml(mdContent);
        createNodeField({
            node,
            name: 'htmlContent',
            value: htmlContent,
        });
    }
};

exports.createPages = async ({ graphql, actions: { createPage } }) => {
    const articleTemplate = path.resolve('src/templates/article/index.jsx');
    const articles = await graphql(`
        query loadPagesQuery ($limit: Int!) {
            allStrapiArticle(filter: { hidden: { eq: false } }, limit: $limit) {
                edges {
                    node {
                        fields {
                            slug
                        }
                        title
                        excerpt
                        fields {
                            createdAtMsk
                        }
                    }
                }
            }
        }
    `, { limit: 1000 });

    if (articles.errors) {
        throw articles.errors;
    }
    articles.data.allStrapiArticle.edges.forEach(({ node }) => {
        createPage({
            path: `${node.fields.slug}`,
            component: articleTemplate,
            context: {
                slug: node.fields.slug,
            },
        });
    });
};
