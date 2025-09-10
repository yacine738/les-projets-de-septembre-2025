import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squares: ('X' | 'O' | null)[] = Array(9).fill(null);
  xIsNext = true;
  winner: 'X' | 'O' | null = null;

  ngOnInit(): void {
    this.newGame();
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

 makeMove(idx: number) {
   if (!this.squares[idx] && !this.winner) {
     this.squares.splice(idx, 1, this.player);;
     this.xIsNext = !this.xIsNext;
     this.winner = this.calculateWinner();
   }
 }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }

  calculateWinner(): 'X' | 'O' | null {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const [a, b, c] of lines) {
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }
}
