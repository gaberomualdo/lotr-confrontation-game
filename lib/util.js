export function classes(...x) {
  return x.join(' ');
}
export function checkPinExists(pin) {
  return new Promise((resolve) => {
    if (process.browser) {
      window.database
        .ref(pin)
        .once('value')
        .then((snapshot) => {
          resolve(snapshot.val() !== null);
        });
    } else {
      resolve(true);
    }
  });
}
