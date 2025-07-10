import { Renderer } from "marked";

export function createTextRenderer() {
  const render = new Renderer();

  render.link = function ({ text }) {
    return text;
  };

  render.paragraph = function ({ text }) {
    return text;
  };

  render.heading = function ({ text }) {
    return text;
  };

  render.image = function () {
    return "";
  };

  return render;
}
