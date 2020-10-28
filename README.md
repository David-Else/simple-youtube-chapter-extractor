# YouTube Chapter Extractor

Extract YouTube chapters from copy/pasted text files and convert them to the [simple mkvmerge chapter format](https://mkvtoolnix.download/doc/mkvmerge.html#mkvmerge.chapters).

Once the chapter file is generated you can create a new video file with them merged in.

```
deno run --allow-read --allow-write [name of text file to process]

or:

./youtube-timestamp-to-chapter-file.ts [name of text file to process]
```

You can download `mkvmerge` from [the home site](https://mkvtoolnix.download/downloads.html) and use:

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
