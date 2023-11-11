import { PolyanetIndex, QuadrantTransformations } from "../models";

// With the symmetry of the grid around row 13, we utilize that to automate placing Polyanets and transfor the index based on quadarant Id
const quadrantTransformations: QuadrantTransformations = {
    1: (idx: PolyanetIndex) => ({ row: idx.row, column: 26 - idx.column }),
    2: (idx: PolyanetIndex) => ({ row: 26 - idx.row, column: 26 - idx.column }),
    3: (idx: PolyanetIndex) => ({ row: 26 - idx.row, column: idx.column }),
  };
  
// Use a transformation using the quadrantId to get the right index
export const quadrantTransform = (quadrantId: number, idx: PolyanetIndex): PolyanetIndex => {
    const transform = quadrantTransformations[quadrantId];
    // Return the original Index if quadrantId is no transformation found based on quadrantId
    return transform ? transform(idx) : idx;

}