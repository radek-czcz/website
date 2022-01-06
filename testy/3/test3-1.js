let domparser = new DOMParser();
let doc = domparser.parseFromString("https://rateyourmusic.com/release/album/rigz/wake-ups/",
"text/html");
console.log(doc.title);
