//your JS code here. If required.
const table = document.getElementById('output');
const loadingRow = document.getElementById('loading');

const getRandomTime = () => Math.floor(Math.random() * 3000) + 1000; // Random time between 1 and 3 seconds

const promises = [
    new Promise(resolve => setTimeout(() => resolve("Promise 1"), getRandomTime())),
    new Promise(resolve => setTimeout(() => resolve("Promise 2"), getRandomTime())),
    new Promise(resolve => setTimeout(() => resolve("Promise 3"), getRandomTime()))
];

Promise.all(promises)
    .then(results => {
        table.removeChild(loadingRow);

        results.forEach((result, index) => {
            const newRow = table.insertRow();
            const cell1 = newRow.insertCell(0);
            const cell2 = newRow.insertCell(1);
            
            cell1.textContent = result;
            cell2.textContent = (promises[index].timeout + promises[index].delay) / 1000;
        });

        const totalRow = table.insertRow();
        const totalCell1 = totalRow.insertCell(0);
        const totalCell2 = totalRow.insertCell(1);

        totalCell1.textContent = 'Total';
        totalCell2.textContent = (promises.reduce((acc, promise) => acc + promise.timeout + promise.delay, 0) / 1000).toFixed(3);
    })
    .catch(error => {
        console.error('One or more promises rejected:', error);
    });

promises.forEach(promise => {
    promise.timeout = getRandomTime();
    promise.delay = 0;
    promise.then(result => {
        promise.delay = new Date().getTime() - (promise.startTime + promise.timeout);
    });
    promise.startTime = new Date().getTime();
});
