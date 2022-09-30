/// <reference types="react-scripts" />

declare type StateSetter<T> = (value: T|((value: T) => T)) => void