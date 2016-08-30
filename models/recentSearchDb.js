const RecentSearch = require('./recentSearch');

exports.findRecentSearches = function (res) {

    return new Promise((resolve, reject) => {

        // Retrieves the 20 most recent search queries from the database
        RecentSearch
        .find()
        .sort({ _id: -1 })
        .limit(20)
        .exec((err, result) => {

            if (err) {
                return reject(res.status(500).send('A database error occured: ', err));
            }

            let recentSearchQueries = formatResults(result);

            return resolve(recentSearchQueries);
        });
    });
};

/**
 * Formats the found documents to display the search query, and 
 * the timestamp, converted to simplified ISO 8601 Extended Format:
 * http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15
 * 
 * @param {array} result - Results from the RecentSearches database query
 * @returns {array} An array of the formatted results
 */
function formatResults(result) {

    let formattedRecentQueries = result.map( search => {

        let convertedTimestamp = new Date(+search.timestamp);

        let formattedResult = {
            query: search.query,
            time: convertedTimestamp
        };

        return formattedResult;
    });

    return formattedRecentQueries;
}