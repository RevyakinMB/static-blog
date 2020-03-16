const moment = require('moment-timezone');

exports.onCreateNode = ({ node, actions: { createNodeField } }) => {
    if (node.internal.type.startsWith('Strapi')) {
        const createdAtMsk = moment(node.created_at).tz('Europe/Moscow');
        const updatedAtMsk = moment(node.updated_at).tz('Europe/Moscow');
        createNodeField({
            node,
            name: 'createdAtMsk',
            value: createdAtMsk.format('DD.MM.YYYY HH:mm'),
        });
        createNodeField({
            node,
            name: 'updatedAtMsk',
            value: updatedAtMsk.format('DD.MM.YYYY HH:mm'),
        });
    }
}
