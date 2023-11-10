export type VerseIndex = {
    row: number;
    column: number;
}

export type QuadrantTransformations = {
    [key: number]: (vIdx: VerseIndex) => VerseIndex;
}