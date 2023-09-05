import React, { useState } from 'react';

export const Test = () => {
  const [myArray, setMyArray] = useState([5, 3, 1, 4, 2]);

  function swapElements(index1, index2) {
    if (index1 < 0 || index1 >= myArray.length || index2 < 0 || index2 >= myArray.length) {
      // Handle invalid index values
      console.error("Invalid index values");
      return;
    }

    // Create a new array with swapped elements
    const newArray = [...myArray];
    const temp = newArray[index1];
    newArray[index1] = newArray[index2];
    newArray[index2] = temp;

    // Update the state with the new array
    setMyArray(newArray);
  }

  function insertionSort() {
    const newArray = [...myArray];

    for (let i = 1; i < newArray.length; i++) {
      let j = i;
      while (j > 0 && newArray[j] < newArray[j - 1]) {
        swapElements(j, j - 1);
        j--;
      }
    }
  }

  function isSorted(arr) {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) {
        return false;
      }
    }
    return true;
  }

  function sortIfNeeded() {
    if (!isSorted(myArray)) {
      insertionSort();
    }
  }

  return (
    <div>
      <p>Before sort: {myArray.join(', ')}</p>
      <button onClick={sortIfNeeded}>Sort if Needed</button>
      <p>After sort: {myArray.join(', ')}</p>
    </div>
  );
}
