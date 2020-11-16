import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.78.0/testing/asserts.ts";
import { ChapterFile } from "./youtube-chapter-extractor.ts";

Deno.test({
  name: "create chapter files from sample text with correct file name",
  fn(): void {
    // Arrange
    const testFileName = "test-file-name";
    /**
     * Deno Course - Better than Node.js? https://www.youtube.com/watch?v=TQUy8ENesGY
     */
    const denoCourse = `⭐️ Course Contents ⭐️
Introduction
---------------------
⌨️ (00:00:00) Introduction
⌨️ (00:02:02) Course overview`;
    /**
     * Deno Tutorial | Getting Started Tutorial Deno https://www.youtube.com/watch?v=3oKSMPgVDf8
     */
    const denoTutorial = `02:00 - Introduction
02:35 - What does secure by default mean?`;
    /**
     * Python Machine Learning Tutorial (Data Science) https://www.youtube.com/watch?v=7eh4d6sabA0
     */
    const pythonMachineLearning = `03:00:00 Introduction
03:00:59 What is Machine Learning?`;

    // Act
    const chapterFile = new ChapterFile(testFileName, denoCourse);
    const chapterFile1 = new ChapterFile(testFileName, denoTutorial);
    const chapterFile2 = new ChapterFile(testFileName, pythonMachineLearning);

    // Assert
    assertEquals(chapterFile.fileName, `${testFileName}_chapters.txt`);

    assertEquals(
      chapterFile.content,
      `CHAPTER00=00:00:00.000
CHAPTER00NAME=Introduction
CHAPTER01=00:02:02.000
CHAPTER01NAME=Course overview`
    );

    assertEquals(
      chapterFile1.content,
      `CHAPTER00=00:02:00.000\nCHAPTER00NAME=Introduction\nCHAPTER01=00:02:35.000\nCHAPTER01NAME=What does secure by default mean?`
    );

    assertEquals(
      chapterFile2.content,
      `CHAPTER00=03:00:00.000\nCHAPTER00NAME=Introduction\nCHAPTER01=03:00:59.000\nCHAPTER01NAME=What is Machine Learning?`
    );
  },
});

Deno.test({
  name: "throw on invalid chapter file",
  fn(): void {
    // Arrange
    const testData = `ffsdf
    ssdfsdf
    ssdfsdfsd sdfs ffsdff sdf sdfssdf`;

    // Assert
    assertThrows(() => {
      new ChapterFile("test-file-name", testData);
    });
  },
});
