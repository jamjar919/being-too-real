type BeRealMemoryImageDetails = {
    url: string,
    width: number,
    height: number
}

type BeRealMemory = {
    id: string,
    thumbnail: BeRealMemoryImageDetails,
    primary: BeRealMemoryImageDetails,
    secondary: BeRealMemoryImageDetails,
    isLate: boolean,
    memoryDay: `${number}-${number}-${number}`,
    location: {
        longitude: number,
        latitude: number
    } | null
};

type BeRealMemoriesResponse = {
    data: BeRealMemory[],
    next: null,
    memoriesSynchronized: true
}

export { BeRealMemoriesResponse }