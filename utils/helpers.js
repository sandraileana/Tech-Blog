// Custom handlebars helper functions
module.exports = {
    format_date: (date) => {
        // Format date as DD/MM/YYYY
        return date.toLocaleDateString();
    },
};
