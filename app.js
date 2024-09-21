let array = [];
let arraySize = 30;

function generateArray() {
    arraySize = document.getElementById("arraySize").value;
    array = [];
    for (let i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * 300) + 10);
    }
    displayArray();
}

function displayArray() {
    const arrayContainer = document.getElementById('array');
    arrayContainer.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.style.height = `${value}px`;
        bar.classList.add('bar');
        arrayContainer.appendChild(bar);
    });
}

function swap(i, j) {
    [array[i], array[j]] = [array[j], array[i]];
    displayArray();
}

async function bubbleSort() {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                swap(j, j + 1);
                await delay(10);
            }
        }
    }
}

async function selectionSort() {
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        swap(i, minIndex);
        await delay(10);
    }
}

async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
            displayArray();
            await delay(10);
        }
        array[j + 1] = key;
        displayArray();
    }
}

async function quickSort(low, high) {
    if (low < high) {
        let pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
}

async function partition(low, high) {
    let pivot = array[high];
    let i = low - 1;
    for (let j = low; j <= high - 1; j++) {
        if (array[j] < pivot) {
            i++;
            swap(i, j);
            await delay(10);
        }
    }
    swap(i + 1, high);
    return i + 1;
}

async function mergeSort(left, right) {
    if (left >= right) {
        return;
    }
    let mid = Math.floor((left + right) / 2);
    await mergeSort(left, mid);
    await mergeSort(mid + 1, right);
    await merge(left, mid, right);
}

async function merge(left, mid, right) {
    let n1 = mid - left + 1;
    let n2 = right - mid;
    let L = array.slice(left, mid + 1);
    let R = array.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            array[k] = L[i];
            i++;
        } else {
            array[k] = R[j];
            j++;
        }
        k++;
        displayArray();
        await delay(10);
    }

    while (i < n1) {
        array[k] = L[i];
        i++;
        k++;
        displayArray();
        await delay(10);
    }

    while (j < n2) {
        array[k] = R[j];
        j++;
        k++;
        displayArray();
        await delay(10);
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

generateArray();
