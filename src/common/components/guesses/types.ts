export interface Guess {
  word: string;
  colors: WordleColor[];
}

export enum WordleColor {
  GREEN = "green",
  GRAY = "gray",
  YELLOW = "yellow",
}

export enum ShowEdit {
  SCORE = "SCORE",
  WORD = "WORD",
}

export enum ButtonLabel {
  WORD = "Word",
  SCORE = "Score",
  HELP = "Cheat",
}
