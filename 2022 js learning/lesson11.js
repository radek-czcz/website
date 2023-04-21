function doAsyncTask(cb) {
  setTimeout(() => {
    console.log("Async Task Calling Callback");
    cb();
  }, 1000);
  console.log('instant message');
}

doAsyncTask(() => console.log("Callback Called"));
