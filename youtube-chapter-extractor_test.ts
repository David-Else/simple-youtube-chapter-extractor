import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.75.0/testing/asserts.ts";
import { ChapterFile } from "./youtube-chapter-extractor.ts";

Deno.test({
  name: "create chapter file with correct file name",
  fn(): void {
    // Arrange
    const testFileName = "test-file-name";
    const testData = `⭐️ Course Contents ⭐️
Introduction
---------------------
⌨️ (00:00:00) Introduction
⌨️ (00:02:02) Course overview`;

    // Act
    const chapterFile = new ChapterFile(testFileName, testData);

    // Assert
    assertEquals(chapterFile.fileName, `${testFileName}_chapters.txt`);
    assertEquals(
      chapterFile.content,
      `CHAPTER0=00:02:02.000
CHAPTER0NAME=Course overview`
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
