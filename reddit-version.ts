// https://www.reddit.com/r/typescript/comments/i020ss/any_ideas_to_refactor_this_class_any_further/

const data = `Project - Survey app
----------------------
⌨️ (01:57:02) Install oak framework and setup basic server
⌨️ (02:03:41) Install denon for automatic server restart on file change
⌨️ (02:06:03) Easily manage versions and dependencies
⌨️ (02:08:06) Organize routes
⌨️ (02:09:36) Create AuthController and configure Login & Register routes
⌨️ (02:13:54) Setup connection with MongoDB
⌨️ (02:19:40) Create User model and implement registration
⌨️ (02:40:42) Implement login
⌨️ (02:54:16) Install dontenv and create .env file`;

/**
 * v1
 */
type Chapter = {
  index: number;
  title: string;
  time: string;
};

type ChapterFile1 = {
  fileName: string;
  content: string;
};

function formatChapter({ index, title, time }: Chapter): string {
  return `CHAPTER${index}=${time}.000\nCHAPTER${index}NAME=${title}`;
}

function extractChapters(input: string, chapterRE: RegExp): Array<Chapter> {
  if (!chapterRE.test(input)) {
    throw Error("No chapter information found");
  }

  return Array.from(input.matchAll(chapterRE)).map((match, index) => {
    const { time, title } = match.groups!;
    return { index, time, title };
  });
}

function app(fileName: string, content: string): ChapterFile1 {
  const chaptersRE = /(?<time>\d{2}:\d{2}:\d{2})\)\u0020(?<title>.*)/g;
  return {
    content: extractChapters(content, chaptersRE).map(formatChapter).join("\n"),
    fileName: `${fileName}_chapters`,
  };
}

console.log(app("example.txt", data));

/**
 * v2
 */
interface ChapterFile2 {
  outputFile: string;
  outputFileName: string;
}

const parseChapterFile = (
  inputFileName: string,
  inputFile: string
): ChapterFile2 => {
  const linesToMatch = /(?<time>\d{2}:\d{2}:\d{2})\)\u0020(?<chapterTitle>.*)/g;
  if (!linesToMatch.test(inputFile)) {
    throw "No chapter information found";
  }
  return {
    outputFileName: `${inputFileName}_chapters`,
    outputFile: Array.from(inputFile.matchAll(linesToMatch))
      .map((line, idx) => {
        const { time, chapterTitle } = line.groups!;
        const chapterNumber = idx + 1;
        return `CHAPTER${chapterNumber}=${time}.000\nCHAPTER${chapterNumber}NAME=${chapterTitle}`;
      })
      .join("\n"),
  };
};

const chapterFile2 = parseChapterFile("example.txt", data);
console.log(chapterFile2.outputFile);
