import {BeRealImage, BeRealLocation} from "./BeRealCommon";

type BeRealMemory = {
    id: string,
    thumbnail: BeRealImage,
    primary: BeRealImage,
    secondary: BeRealImage,
    isLate: boolean,
    memoryDay: `${number}-${number}-${number}`,
    location: BeRealLocation
};

type BeRealMemoriesResponse = {
    data: BeRealMemory[],
    next: null,
    memoriesSynchronized: true
}

export { BeRealMemoriesResponse }