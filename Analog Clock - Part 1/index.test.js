require('text-encoding').TextEncoder;
import "@testing-library/jest-dom/extend-expect";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

describe('Clock functionality', () => {
  let document;
  let window;

  beforeEach(() => {
      // Load the HTML file into JSDOM
      const html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8');
      const { window: jsdomWindow } = new JSDOM(html, { runScripts: 'dangerously', resources: "usable" });
      ({ document, window } = jsdomWindow);
      global.Audio = window.Audio;
  });

  test('Clock is working fine', () => {
      const show_clock = () => {
          let h = document.getElementsByClassName('hr')[0];
          let m = document.getElementsByClassName('mn')[0];
          let s = document.getElementsByClassName('ss')[0];

          let date = new Date(); 

          let hours = date.getHours();
          let minutes = date.getMinutes();
          let seconds = date.getSeconds();

          h.style.transform = `rotate(${30 * hours + minutes/2}deg)`;
          m.style.transform = `rotate(${6 * minutes}deg)`;
          s.style.transform = `rotate(${6 * seconds}deg)`;
      }

      show_clock();

      const hrNeedle = document.getElementsByClassName('hr')[0];
      const mnNeedle = document.getElementsByClassName('mn')[0];
      const ssNeedle = document.getElementsByClassName('ss')[0];

      expect(hrNeedle.style.transform).toBeDefined();
      expect(hrNeedle.style.transform).not.toEqual('');
      expect(mnNeedle.style.transform).toBeDefined();
      expect(mnNeedle.style.transform).not.toEqual('');
      expect(ssNeedle.style.transform).toBeDefined();
      expect(ssNeedle.style.transform).not.toEqual('');
  });

  test('Sound is playing when needle is moving', () => {
      const show_clock = () => {
          let sound = new Audio('song.mp3');
          sound.play();
      }

      const audioSpy = jest.spyOn(window.Audio.prototype, 'play');

      show_clock();

      expect(audioSpy).toHaveBeenCalled();
  });
});