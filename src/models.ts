export interface PolyanetIndex {
    row: number;
    column: number;
}

export interface QuadrantTransformations {
    [key: number]: (idx: PolyanetIndex) => PolyanetIndex;
}

export interface SoloonItem extends PolyanetIndex {
    color: SoloonColor;
}

export interface ComethItem extends PolyanetIndex {
    direction: ComethDirection;
}

export enum SoloonColor {
    WHITE_SOLOON = "white",
    BLUE_SOLOON = "blue",
    PURPLE_SOLOON = "purple",
    RED_SOLOON = "red"
};

export enum ComethDirection {
    UP_COMETH = "up",
    DOWN_COMETH = "down",
    RIGHT_COMETH = "right",
    LEFT_COMETH = "left"
};