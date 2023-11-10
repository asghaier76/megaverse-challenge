import axios from 'axios';

export class Polyanet {
  private apiUrl: string;
  private urlSegment = 'polyanets'
  constructor(apiUrl: string) {
    this.apiUrl = apiUrl + this.urlSegment;
  }

  public async fillPolyanet(row: number, column: number): Promise<void> {
    const candidateId = process.env.CANDIDATE_ID;

    await axios.post(this.apiUrl, { row, column, candidateId });
  }
}