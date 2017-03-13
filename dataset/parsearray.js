const fs = require('fs');

const raw = fs.readFileSync('dataset/iris.data', 'utf8');
const lines = raw.split('\n');
const attributeNames = ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth', 'class'];
const data = [];

lines.forEach((line, index) => {
    const instance = [];
    line.split(',').forEach((value, index) => {
        const valueNumber = Number(value);
        if (!isNaN(valueNumber)) instance.push(valueNumber);
    });
    data.push(instance);
});

console.log(data.length);
console.log(JSON.stringify(data));
