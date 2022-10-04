/// <reference types="react-scripts" />

declare type StateSetter<T> = (value: T | ((value: T) => T)) => void
type ResponseServer = {
    command: "START" | "HAND" | "STAND" | "DRAW" | "EXIT" | "WIN" | "LOST" | "JOIN" | "PLAYERS" | "HANDSHAKE"
    body?: string[]
}

type CardColor = "red" | "black";
type CardNumber = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "j" | "q" | "k" | "a";
type CardSuit = "clubs" | "diamonds" | "hearts" | "spades";