import { useReadingWordImagesQuizStore } from "@/stores/wordImagesQuiz";

export interface WordImageQuiz {
  word: string;
  image1: string;
  image2: string;
}
export class WordImagesQuizHelper {
  private wordImagesQuizStore;

  private quizes: Array<WordImageQuiz> = [
    { word: "Taube", image1: "/assets/logo.svg", image2: "/assets/logo.svg" },
    { word: "Traube", image1: "/assets/logo.svg", image2: "/assets/logo.svg" },
    { word: "Reiher", image1: "/assets/logo.svg", image2: "/assets/logo.svg" },
    { word: "Park", image1: "/assets/logo.svg", image2: "/assets/logo.svg" },
    { word: "Bäcker", image1: "/assets/logo.svg", image2: "/assets/logo.svg" },
    { word: "Roller", image1: "/assets/logo.svg", image2: "/assets/logo.svg" },
    { word: "Bank", image1: "/assets/logo.svg", image2: "/assets/logo.svg" },
  ];

  constructor() {
    this.wordImagesQuizStore = useReadingWordImagesQuizStore();
  }

  public getQuizes() {
    return this.quizes;
  }
}
