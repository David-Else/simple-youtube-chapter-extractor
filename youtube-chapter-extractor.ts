#!/usr/bin/env -S deno run --allow-read --allow-write

export class ChapterFile {
  public readonly content: string;
  public readonly fileName: string;
  // https://regex101.com/
  private readonly linesToMatch = /(?<time>\d{2}:\d{2}:\d{2}|\d{2}:\d{2})\)?\s(\-)?(\s)?(?<chapterTitle>.*)/g;

  constructor(inputFileName: string, inputFile: string) {
    if (!this.linesToMatch.test(inputFile)) {
      throw new Error("No chapter information found");
    }
    this.linesToMatch.lastIndex = 0; // reset the index after test moved it on

    this.fileName = `${inputFileName}_chapters.txt`;

    const matchedLines = inputFile.matchAll(this.linesToMatch);
    this.content = Array.from(matchedLines, (line, index) => {
      const { time, chapterTitle } = line.groups!;
      return `CHAPTER${index}=${time}.000\nCHAPTER${index}NAME=${chapterTitle}`;
    }).join("\n");
  }
}

if (import.meta.main) {
  if (Deno.args.length !== 1) {
    throw "Please supply one file name argument containing the text file to extract chapters from";
  }
  const inputFilename = Deno.args[0];
  const inputFile = Deno.readTextFileSync(inputFilename);

  const chapterFile = new ChapterFile(inputFilename, inputFile);

  Deno.writeTextFile(chapterFile.fileName, chapterFile.content);
  console.log(`${chapterFile.fileName} file has been generated`);
}
