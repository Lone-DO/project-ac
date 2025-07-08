import React from "react";

const Info = () => {
  let wallpaperURL = "http://www.pixelstalk.net/animal-crossing-wallpapers-hd/",
    taneURL = "http://tane.us/ac/wwcf.html",
    nintendoURL = "http://www.animal-crossing.com";

  return (
    <div className="Actunes_guide">
      <h3>
        Animal Crossing Tunes <strong>README</strong>
      </h3>
      <p>
        The purpose of this project is to create a 3rd party App that brings the
        nostalgia to your Mobile/ PC.
      </p>
      <p>
        Bring back the Nostalgic tunes as we've known it in the past, Dynamic
        music that reflects with your local time just as had in the world of
        Animal Crossing. The Digital clock will be able to play along in your
        background throughout your day, or if you are wishing to change the
        mood, you will be able to manually change the clocks time.
      </p>
      <p>
        But what about the classics? There will be a theme feature that allows
        you to choose which Series you want to listen to and even have the
        overall view of the page change with it, more n more features to help
        give you the comfort & vibes from, Animal Crossing.
      </p>
      <p>
        The app version will host the files itself, and the Website will use API
        to pull the information. Later on there will be an option on both
        versions to choose Offline/ Online mode, otherwise testing will be done
        to see which one overall performs the best and will be set as the
        default~
      </p>

      <ol className="Actunes_guide-links">
        <li>
          <p>
            General Idea,<a href={taneURL}>Tane</a> Note that i recently found
            this site and have been discussing this project idea!
          </p>
        </li>
        <li>
          <a href={nintendoURL}>Nintendo Official Site</a>
        </li>
        <hr />

        <p>Extra Sites</p>
        <li>
          <a href={wallpaperURL}>Wallpapers/ images</a>
        </li>
        <li>
          Weather SVG Credits: Icons made by{" "}
          <a href="https://www.freepik.com/" title="Freepik">
            Freepik
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>{" "}
          is licensed by{" "}
          <a
            href="http://creativecommons.org/licenses/by/3.0/"
            title="Creative Commons BY 3.0"
          >
            CC 3.0 BY
          </a>
        </li>
      </ol>
    </div>
  );
};

export default Info;
