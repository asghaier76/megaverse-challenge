import fs from 'fs';
import path from 'path';
import { SoloonItem, SoloonColor, ComethItem, ComethDirection } from '../models'

// Function to extract SOLOONs indices from the matrix
const extractSoloons = (matrix: string[][]): SoloonItem[] => {
    const soloons: SoloonItem[] = [];

    matrix.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell.includes('SOLOON')) {
                const color = cell as unknown as SoloonColor; // Cast the string to SoloonColor type
                soloons.push({ row: rowIndex, column: colIndex, color });
            }
        });
    });

    return soloons;
};

// Function to extract COMETHs indices from the matrix
const extractComeths = (matrix: string[][]): ComethItem[] => {
    const comeths: ComethItem[] = [];

    matrix.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell.includes('COMETH')) {
                const direction = cell as unknown as ComethDirection; // Cast the string to ComethDirection type
                comeths.push({ row: rowIndex, column: colIndex, direction });
            }
        });
    });

    return comeths;
};

// Function to read the matrix from a JSON file and extract SOLOONs adn COMETHS
const processMatrixFile = async (filePath: string): Promise<{soloons: SoloonItem[], comeths: ComethItem[]} | null> => {
    try {
        const fileContent = await fs.promises.readFile(filePath, 'utf-8');
        const matrix = JSON.parse(fileContent) as string[][];
        const soloons = extractSoloons(matrix);
        const comeths = extractComeths(matrix);
        return {soloons, comeths}
    } catch (error) {
        console.error('Error reading the matrix file:', error);
        return null;
    }
};

const filePath = path.join(__dirname, '../../goal.json');
processMatrixFile(filePath).then((res: any) => {
    console.log(res.soloons);
    console.log(res.comeths);
});
