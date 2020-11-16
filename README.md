# Simple YouTube Chapter Extractor

Copy the text containing chapter information directly from YouTube and convert it into [simple mkvmerge chapter format](https://mkvtoolnix.download/doc/mkvmerge.html#mkvmerge.chapters) to embed in your downloaded YouTube video.

# Requirements

- [Deno](https://deno.land/) installed
- `mkvmerge` command line tool or `MKVToolNix GUI` installed
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

![example](images/video-chapters.gif)

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

- Use `MKVToolNix GUI` which contains all the functionality of `mkvmerge`

![chapter-file](images/chapter-file.png)

or

- Download `mkvmerge` from [the home site](https://mkvtoolnix.download/downloads.html) and use:

```
mkvmerge \
  --chapters originalfilename_chapters.txt \
  -o output-file.mkv \
  input-file.mkv
```

or

- [Flathub](https://flathub.org/apps/details/org.bunkus.mkvtoolnix-gui) and use:

```
flatpak run --command=mkvmerge org.bunkus.mkvtoolnix-gui --chapters originalfilename_chapters.txt -o output-file.mkv input-file.mkv
```

# Development

Run `deno test` to run tests.

## Suggested contributions

- Add more text chapter formats
- Add more tests
- Automate `mkvmerge` usage
- Automate `youtube-dl` chapter extraction from JSON file. The feature is currently broken, and the entire `youtube-dl` github is down due to stupid [DMCA takedown notice by RIAA](https://github.com/github/dmca/blob/master/2020/10/2020-10-23-RIAA.md)

## Suggested things not to bother with

- Automating everything using the YouTube API. It has been done by https://github.com/gabrielfroes/youtube-chapter-extractor, and it seems to keep breaking and be too complex.

# The future of video sharing

The future of video sharing is federated peer to peer, we must be free to express ourselves without corporate or government censorship. Have a look at https://joinpeertube.org/.
