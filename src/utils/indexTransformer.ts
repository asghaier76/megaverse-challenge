import { VerseIndex, QuadrantTransformations } from "../types";

const quadrantTransformations: QuadrantTransformations = {
    1: (vIdx: VerseIndex) => ({ row: vIdx.row, column: 26 - vIdx.column }),
    2: (vIdx: VerseIndex) => ({ row: 26 - vIdx.row, column: 26 - vIdx.column }),
    3: (vIdx: VerseIndex) => ({ row: 26 - vIdx.row, column: vIdx.column }),
  };
  
// Use a transformation using the quadrantId to get the right index
export const quadrantTransform = (quadrantId: number, vIdx: VerseIndex): VerseIndex => {
    const transform = quadrantTransformations[quadrantId];
    // Return the original VerseIndex if quadrantId is no transformation found based on quadrantId
    return transform ? transform(vIdx) : vIdx;

}