const fs = require("fs");
const path = require("path");
const ytdl = require("ytdl-core");
const hyperid = require("hyperid");
const ffmpeg = require("fluent-ffmpeg");

(async () => {
  const instance = hyperid({
    fixedLength: true,
    urlSafe: true,
  });
  const filename = instance();
  const videoID = "https://youtu.be/KlDUtTDm5jY";
  const mp3AudioFile = path.join(__dirname, `temp/${filename}.mp3`);
  const mp4VideoFile = path.join(__dirname, `temp/${filename}.mp4`);

  const video = ytdl(videoID).on("end", () => {
    console.log("Audio download end");
    ffmpeg(mp4VideoFile)
      .format("mp3")
      .output(fs.createWriteStream(mp3AudioFile))
      .on("error", (err) => {
        console.log("An error occurred: " + err.message);
      })
      .on("end", () => {
        console.log("Processing finished !");
      })
      .run();
  });

  video.pipe(fs.createWriteStream(mp4VideoFile));
})();
