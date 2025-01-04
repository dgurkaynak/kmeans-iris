var KMeans = function(options) {
    options = _.assign({
        data: [],
        k: 3,
        centeroids: null,
        iteration: 0,
    }, _.cloneDeep(options || {}));

    // Random centeroids
    if (!options.centeroids)
        options.centeroids = _.sampleSize(options.data, options.k);

    // Label data to closest centeroid
    options.classes = _.groupBy(options.data, function(point) {
        const closestCenteroid = _.minBy(options.centeroids, function(centeroidPoint) {
            return euclideanDistance(point, centeroidPoint);
        });

        return options.centeroids.indexOf(closestCenteroid);
    })

    return options;
};


KMeans.iterate = function(options) {
    const newCenteroids = _.map(options.centeroids, function(centeroid, index) {
        return mean(options.classes[index]);
    });

    return KMeans({
        data: options.data,
        k: options.k,
        centeroids: newCenteroids,
        iteration: options.iteration + 1
    });
};


// KMeans.run = function(options) {
//     const initialDistribution = _.map(options.classes, data => data.length);
//     const newOptions = KMeans.iterate(options);
//     const newDistribution = _.map(newOptions.classes, data => data.length);

//     if (_.isEqual(initialDistribution, newDistribution))
//         return newOptions;
//     else
//         return KMeans.run(newOptions);
// };


KMeans.runAnimation = function(options, interval, intervalCallback) {
    const newOptions = KMeans.iterate(options);

    if (_.isEqual(options.centeroids, newOptions.centeroids)) {
        intervalCallback && intervalCallback(true, newOptions);
        return;
    }

    setTimeout(function() {
        KMeans.runAnimation(newOptions, interval, intervalCallback);
    }, interval);

    intervalCallback && intervalCallback(false, newOptions);
};


function euclideanDistance(a, b) {
    var sum = 0
    var n
    for (n = 0; n < a.length; n++) {
        sum += Math.pow(a[n] - b[n], 2)
    }
    return Math.sqrt(sum);
}


function mean(vectors) {
    const sums = _.times(vectors[0].length, _.constant(0));

    _.forEach(vectors, function(vector) {
        _.forEach(vector, function(num, index) {
            sums[index] += num;
        });
    });

    return _.map(sums, function(sum) {
        return sum / vectors.length;
    });
}
