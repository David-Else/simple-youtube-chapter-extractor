# YouTube Chapter Extractor

Extract YouTube chapters from copy/pasted text files for conversion to the [simple mkvmerge chapter format](https://mkvtoolnix.download/doc/mkvmerge.html#mkvmerge.chapters) using the `mkvmerge` command line tool or `MKVToolNix GUI`.

# Requirements

- [Deno](https://deno.land/) installed
- A text file with chapters that are in any of the following formats:

The time stamp in either `00:00` or `00:00:00` format followed by either:

`space` `title`:

```
03:00:00 Introduction
```

`)` `space` `title`:

```
⌨️ (00:00:00) Introduction
```

`space` `-` `space` `title`

```
02:00 - Introduction
```

The current regex used is:

`/(?<time>\d{2}:\d{2}:\d{2}|\d{2}:\d{2})\)?\s(\-)?(\s)?(?<chapterTitle>.*)/g;`.

Please contribute more formats to help others use this program!

# Usage

- Find a video that uses the recent YouTube chapters feature, they look like:

![example](video-chapters.gif)

- You can download YouTube videos using [youtube-dl](https://youtube-dl.org/) or one of many browser extensions
- Under the video in the description there should be text including chapters. Copy and paste all the text into a file for use with this program. It might look like:

```
⭐️ Course Contents ⭐️
Introduction
---------------------
⌨️ (00:00:00) Introduction
⌨️ (00:02:02) Course overview
⌨️ (00:04:38) Course Project
⌨️ (00:05:51) What is Deno
⌨️ (00:08:19) Course project (Survey app) demo
⌨️ (00:11:54) Install and Getting started
⌨️ (00:14:34) Write "Hello World"
⌨️ (00:15:50) Main Features
```

## Extract chapters from text file

```
deno run --allow-read --allow-write youtube-chapter-extractor.ts [name of text file to process]
```

or:

```
./youtube-chapter-extractor.ts [name of text file to process]
```

## Merge chapters into video file

Download `mkvmerge` from [the home site](https://mkvtoolnix.download/downloads.html) and use:

```
mkvmerge \
  --chapters originalfilename_chapters.txt \
  -o output-file.mkv \
  input-file.mkv
```

or [Flathub](https://flathub.org/apps/details/org.bunkus.mkvtoolnix-gui) and use:

```
flatpak run --command=mkvmerge org.bunkus.mkvtoolnix-gui --chapters originalfilename_chapters.txt -o output-file.mkv input-file.mkv
```

Or use `MKVToolNix GUI` which contains all the functionality of `mkvmerge`.

# Development

`deno test` to run tests

Suggested contributions:

- Add more text chapter formats
- Automate `mkvmerge` usage
