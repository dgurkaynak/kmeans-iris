const fs = require('fs');

const raw = fs.readFileSync('dataset/iris.data', 'utf8');
const lines = raw.split('\n');
const attributeNames = ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth', 'class'];
const data = [];

lines.forEach((line, index) => {
    const instance = {};
    const attributeValues = line.split(',');
    attributeValues.forEach((value, index) => {
        const attributeName = attributeNames[index];
        const valueNumber = Number(value);
        instance[attributeName] = isNaN(valueNumber) ? value : valueNumber;
    });
    data.push(instance);
});

fs.writeFile('dataset/iris.json', JSON.stringify(data, null, 4), (err) => {
    if (err) return console.log('Could not save json', err);
    console.log('Done!');
});
