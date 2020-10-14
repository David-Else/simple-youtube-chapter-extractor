#!/usr/bin/env -S deno run --allow-read --allow-write

/**
 * Name         : YouTube timestamp to chapter file
 * Usage        : ./mod.ts textfile
 * Description  : Process text file with chapter info copy pasted from YouTube containing lines in the following format:
 *                `00:00:00) Name of chapter\n`
 *                and convert to a MKV/MP4 chapter file for use with https://mkvtoolnix.download/
 *                https://github.com/ytdl-org/youtube-dl/issues/26005
 *                https://github.com/wattux/youtube-dl/commit/dcab7389acae63f0d2e01e13257e840e00c40518
 */
export class ChapterFile {
  public readonly content: string;
  public readonly fileName: string;
  private readonly linesToMatch =
    /(?<time>\d{2}:\d{2}:\d{2})\)\u0020(?<chapterTitle>.*)/g;

  constructor(inputFileName: string, inputFile: string) {
    if (!this.linesToMatch.test(inputFile)) {
      throw new Error("No chapter information found");
    }
    this.fileName = `${inputFileName}_chapters`;

    const matchedLines = inputFile.matchAll(this.linesToMatch);
    this.content = Array.from(matchedLines, (line, index) => {
      const { time, chapterTitle } = line.groups!;
      return `CHAPTER${index}=${time}.000\nCHAPTER${index}NAME=${chapterTitle}`;
    }).join("\n");
  }
}

if (import.meta.main) {
  if (Deno.args.length !== 1) {
    throw "Please supply one file name argument";
  }
  const inputFilename = Deno.args[0];
  const inputFile = Deno.readTextFileSync(inputFilename);

  const chapterFile = new ChapterFile(inputFilename, inputFile);

  Deno.writeTextFile(chapterFile.fileName, chapterFile.content);
  console.log(`${chapterFile.fileName} file has been generated`);
}
