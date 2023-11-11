export interface PolyanetIndex {
    row: number;
    column: number;
}

export interface QuadrantTransformations {
    [key: number]: (idx: PolyanetIndex) => PolyanetIndex;
}

export interface Index {
    row: number;
    column: number;
}