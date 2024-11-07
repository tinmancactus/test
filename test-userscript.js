// ==UserScript==
// @name         Test Script
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Test loading script from GitHub
// @author       You
// @match        *://*/*
// @require      https://raw.githubusercontent.com/tinmancactus/test/main/foo.js
// @grant        GM_addStyle, GM_addElement
// ==/UserScript==
(function () {
  "use strict";
  // alert("Hello, world!");

  // Tampermonkey script
  GM_addStyle(`
    #floating-div {
      position: absolute;
      top: 50px;
      left: 50px;
      width: 200px;
      height: 100px;
      background-color: #f2f2f2;
      border: 1px solid #ccc;
      padding: 10px;
      cursor: move;
    }
  `);

  GM_addElement("div", {
    id: "floating-div",
    textContent: "Floating Div",
  });

  // JavaScript
  const floatingDiv = document.getElementById("floating-div");

  let isDown = false;
  let offset = [0, 0];

  floatingDiv.addEventListener("mousedown", (e) => {
    if (e.button === 0) {
      isDown = true;
      offset = [floatingDiv.offsetLeft - e.clientX, floatingDiv.offsetTop - e.clientY];
    }
  });

  document.addEventListener("mouseup", () => {
    isDown = false;
  });

  document.addEventListener("mousemove", (e) => {
    if (isDown) {
      floatingDiv.style.top = `${e.clientY + offset[1]}px`;
      floatingDiv.style.left = `${e.clientX + offset[0]}px`;
    }
  });
})();
