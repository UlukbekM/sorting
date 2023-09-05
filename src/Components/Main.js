import React, {useState,useEffect  } from "react";

export const Main = () => {
    // const [arraySize,setArraySize] = useState(100)
    // const [arrayMinValue,setArrayMinValue] = useState(5)
    // const [arrayMaxValue,setArrayMaxValue] = useState(500)
    const min = 5
    // const max = 500

    const [array,setArray] = useState([])
    const [sorted,setSorted] = useState(false)
    const [off,setOff] = useState(false)
    const [timeTaken, setTimeTaken] = useState(0);
    const [showValues, setShowValues] = useState(true)

    const handleChange = () => {
        setShowValues(!showValues);
    };

    useEffect(()=> {
        // console.log("bar count:"+Math.round(window.innerWidth*0.05))
        // console.log("bar height:"+Math.round(window.innerHeight * 0.50))
        // calculateArraySize()
        newArray()
    }, [])

    const calculateArraySize = () => {
        // let width = window.innerWidth
        // console.log(Math.round(width*0.05))
        // setArraySize(Math.round(width*0.02))
    }

    const newArray =()=> {
        const temp = []
        for(let i = 0; i < (Math.round(window.innerWidth*0.05)); i++) {
            temp.push(Math.floor(Math.random() * ((window.innerHeight * 0.5) - min + 1) + min))
        }
        setArray(temp)
        setSorted(false)
    }



    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    const insertionSortStepByStep = async () => {
        setOff(true)
        let newArr = [...array];
        for (let i = 1; i < newArr.length; i++) {
            let key = newArr[i];
            let j = i - 1;
            while (j >= 0 && key < newArr[j]) {
                newArr[j + 1] = newArr[j];
                j--;
            }
            newArr[j + 1] = key;
            setArray([...newArr]);
            await delay(50);
        }
        setSorted(true)
        setOff(false)
    };

    // const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    const bubbleSortStepByStep = async () => {
        setOff(true)
        let newArr = [...array];
        for (let i = 0; i < newArr.length - 1; i++) {
            for (let j = 0; j < newArr.length - i - 1; j++) {
                if (newArr[j] > newArr[j + 1]) {
                    // Swap elements
                    [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]];
                    setArray([...newArr]);
                    await delay(10); // Adjust the delay time as needed
                }
            }
        }
        setSorted(true)
        setOff(false)
    };

    const selectionSortStepByStep = async () => {
        setOff(true)
        let newArr = [...array];
        for (let i = 0; i < newArr.length - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < newArr.length; j++) {
                if (newArr[j] < newArr[minIndex]) {
                    minIndex = j;
                }
            }
            if (minIndex !== i) {
                // Swap elements
                [newArr[i], newArr[minIndex]] = [newArr[minIndex], newArr[i]];
                setArray([...newArr]);
                await delay(50); // Adjust the delay time as needed
            }
        }
        setSorted(true)
        setOff(false)
    };

    const shellSortStepByStep = async () => {
        setOff(true)
        let newArr = [...array];
        const n = newArr.length;
        for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
            for (let i = gap; i < n; i++) {
                let temp = newArr[i];
                let j;
                for (j = i; j >= gap && newArr[j - gap] > temp; j -= gap) {
                    newArr[j] = newArr[j - gap];
                }
                newArr[j] = temp;
                setArray([...newArr]);
                await delay(50); // Adjust the delay time as needed
            }
        }
        setSorted(true)
        setOff(false)
    };

    const merge = async (arr, left, middle, right) => {
        const n1 = middle - left + 1;
        const n2 = right - middle;

        const leftArr = arr.slice(left, left + n1);
        const rightArr = arr.slice(middle + 1, middle + 1 + n2);

        let i = 0, j = 0, k = left;

        while (i < n1 && j < n2) {
            if (leftArr[i] <= rightArr[j]) {
                arr[k++] = leftArr[i++];
            } else {
                arr[k++] = rightArr[j++];
            }
            setArray([...arr]);
            await delay(50); // Adjust the delay time as needed
        }

        while (i < n1) {
            arr[k++] = leftArr[i++];
            setArray([...arr]);
            await delay(50);
        }

        while (j < n2) {
            arr[k++] = rightArr[j++];
            setArray([...arr]);
            await delay(50);
        }
    };

    const mergeSortStepByStep = async (arr, left, right) => {
        if (left < right) {
            const middle = Math.floor((left + right) / 2);
            await mergeSortStepByStep(arr, left, middle);
            await mergeSortStepByStep(arr, middle + 1, right);
            await merge(arr, left, middle, right);
        }
    };

    const sortArrayStepByStep = async () => {
        setOff(true)
        const newArr = [...array];
        await mergeSortStepByStep(newArr, 0, newArr.length - 1);
        setSorted(true)
        setOff(false)
    };

    const heapify = async (arr, n, i) => {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }

        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }

        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            setArray([...arr]);
            await delay(20); // Adjust the delay time as needed

            await heapify(arr, n, largest);
        }
    };

    const heapSortStepByStep = async () => {
        setOff(true)
        const newArr = [...array];
        const n = newArr.length;

        // Build max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await heapify(newArr, n, i);
        }

        // Extract elements one by one from the heap
        const startTime = performance.now();
        for (let i = n - 1; i > 0; i--) {
            [newArr[0], newArr[i]] = [newArr[i], newArr[0]];
            setArray([...newArr]);
            await delay(500); // Adjust the delay time as needed

            await heapify(newArr, i, 0);
        }
        const endTime = performance.now();

        setTimeTaken(endTime - startTime);
        setSorted(true)
        setOff(false)
        // alert("heap sort took " + endTime - startTime)
    };


    const partition = async (arr, low, high) => {
        const pivot = arr[high];
        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                setArray([...arr]);
                await delay(50); // Adjust the delay time as needed
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        setArray([...arr]);
        await delay(50);
        return i + 1;
    };

    const quickSortStepByStep = async (arr, low, high) => {
        if (low < high) {
            const pivotIndex = await partition(arr, low, high);
            await quickSortStepByStep(arr, low, pivotIndex - 1);
            await quickSortStepByStep(arr, pivotIndex + 1, high);
        }
    };

    const quickSortArrayStepByStep = async () => {
        setOff(true)
        const newArr = [...array];
        await quickSortStepByStep(newArr, 0, newArr.length - 1);
        setSorted(true)
        setOff(false)
    };

    return(
    <div className="h-screen flex flex-col bg-[#16161a] text-[#fffffe]">
        <div className="bg-[#242629] flex">
            <div className="basis-1/6 flex justify-center flex-wrap">
                <button onClick={()=>newArray()} className={`inline-block m-2 lg:m-5 p-2 border  border-[#7f5af0]  rounded-md font-bold bg-[#7f5af0]  ${!off && "hover:border-[#fffffe]"} ${off && "hover:cursor-not-allowed"}`} disabled={off}>New Array</button>
                <button className={` border ${showValues? "bg-[#00A36C] border-[#00A36C]":"bg-[#DC381F] border-[#DC381F]"} rounded-md m-2 lg:m-5 p-2 font-bold ${!off && "hover:border-[#fffffe]"} ${off && "hover:cursor-not-allowed"}`} onClick={()=>handleChange()} disabled={off}>Show Values</button>
            </div>
            <div className="basis-5/6 flex justify-center flex-wrap">
                <button onClick={()=>insertionSortStepByStep()} className={`bg-[#7f5af0] border  border-[#7f5af0] inline-block m-1 lg:m-5 p-2  rounded-lg font-bold ${!off && !sorted && "hover:border-[#fffffe]"} ${off && "hover:cursor-not-allowed"}  ${sorted && "hover:cursor-not-allowed"}`} disabled={sorted || off}>Insertion Sort</button>
                <button onClick={()=>bubbleSortStepByStep()} className={`bg-[#7f5af0] border  border-[#7f5af0] inline-block m-2 lg:m-5 p-2 rounded-lg font-bold ${!off && !sorted && "hover:border-[#fffffe]"} ${off && "hover:cursor-not-allowed"}  ${sorted && "hover:cursor-not-allowed"}`} disabled={sorted || off}>Bubble Sort</button>
                <button onClick={()=>selectionSortStepByStep()} className={`bg-[#7f5af0] border  border-[#7f5af0] inline-block m-2 lg:m-5 p-2 rounded-lg font-bold ${!off && !sorted && "hover:border-[#fffffe]"} ${off && "hover:cursor-not-allowed"}  ${sorted && "hover:cursor-not-allowed"}`} disabled={sorted || off}>Selection Sort</button>
                <button onClick={()=>shellSortStepByStep()} className={`bg-[#7f5af0] border  border-[#7f5af0] inline-block m-2 lg:m-5 p-2 rounded-lg font-bold ${!off && !sorted && "hover:border-[#fffffe]"} ${off && "hover:cursor-not-allowed"}  ${sorted && "hover:cursor-not-allowed"}`} disabled={sorted || off}>Shell Sort</button>
                <button onClick={()=>sortArrayStepByStep()} className={`bg-[#7f5af0] border  border-[#7f5af0] inline-block m-2 lg:m-5 p-2 rounded-lg font-bold ${!off && !sorted && "hover:border-[#fffffe]"} ${off && "hover:cursor-not-allowed"}  ${sorted && "hover:cursor-not-allowed"}`} disabled={sorted || off}>Merge Sort</button>
                <button onClick={()=>heapSortStepByStep()} className={`bg-[#7f5af0] border  border-[#7f5af0] inline-block m-2 lg:m-5 p-2 rounded-lg font-bold ${!off && !sorted && "hover:border-[#fffffe]"} ${off && "hover:cursor-not-allowed"}  ${sorted && "hover:cursor-not-allowed"}`} disabled={sorted || off}>Heap Sort</button>
                <button onClick={()=>quickSortArrayStepByStep()} className={`bg-[#7f5af0] border  border-[#7f5af0] inline-block m-2 lg:m-5 p-2 rounded-lg font-bold ${!off && !sorted && "hover:border-[#fffffe]"} ${off && "hover:cursor-not-allowed"}  ${sorted && "hover:cursor-not-allowed"}`} disabled={sorted || off}>Quick Sort</button>
            </div>
            {/* <div className="basis-1/6 flex">
                <input type="checkbox"           
                checked={showValues}
                onChange={handleChange}/> Show Value
            </div> */}
        </div>


        {/* <div>
            <button onClick={()=>insertionSortStepByStep()} className={`border inline-block m-5 p-2 rounded-lg font-bold ${off && "hover:cursor-not-allowed"}  ${sorted ? "hover:cursor-not-allowed":"hover:bg-slate-600"}`} disabled={sorted || off}>Insertion Sort</button>
            <button onClick={()=>bubbleSortStepByStep()} className={`border inline-block m-5 p-2 rounded-lg font-bold ${off && "hover:cursor-not-allowed"}  ${sorted ? "hover:cursor-not-allowed":"hover:bg-slate-600"}`} disabled={sorted || off}>Bubble Sort</button>
            <button onClick={()=>selectionSortStepByStep()} className={`border inline-block m-5 p-2 rounded-lg font-bold ${off && "hover:cursor-not-allowed"}  ${sorted ? "hover:cursor-not-allowed":"hover:bg-slate-600"}`} disabled={sorted || off}>Selection Sort</button>
            <button onClick={()=>shellSortStepByStep()} className={`border inline-block m-5 p-2 rounded-lg font-bold ${off && "hover:cursor-not-allowed"}  ${sorted ? "hover:cursor-not-allowed":"hover:bg-slate-600"}`} disabled={sorted || off}>Shell Sort</button>
            <button onClick={()=>sortArrayStepByStep()} className={`border inline-block m-5 p-2 rounded-lg font-bold ${off && "hover:cursor-not-allowed"}  ${sorted ? "hover:cursor-not-allowed":"hover:bg-slate-600"}`} disabled={sorted || off}>Merge Sort</button>
            <button onClick={()=>heapSortStepByStep()} className={`border inline-block m-5 p-2 rounded-lg font-bold ${off && "hover:cursor-not-allowed"}  ${sorted ? "hover:cursor-not-allowed":"hover:bg-slate-600"}`} disabled={sorted || off}>Heap Sort</button>
            <button onClick={()=>quickSortArrayStepByStep()} className={`border inline-block m-5 p-2 rounded-lg font-bold ${off && "hover:cursor-not-allowed"}  ${sorted ? "hover:cursor-not-allowed":"hover:bg-slate-600"}`} disabled={sorted || off}>Quick Sort</button>
        </div> */}

        <div className="absolute bottom-10 right-0 left-0 items-end flex justify-center">
            {array.map((value, idx) => (
                <div className="mx-1 w-2 inline-block" key={idx}>
                    {showValues && 
                        <div className="-rotate-90 font-bold">
                            {value}
                        </div>
                    }

                    <div className={` ${sorted ? "bg-[#2cb67d]":"bg-[#7f5af0]"}`} style={{height: `${value}px`}}>
                    </div>
                </div>
            ))}
        </div>
    </div>
    )
}