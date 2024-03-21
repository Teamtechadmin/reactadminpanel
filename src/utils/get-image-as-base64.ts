export function readImage(url: string, callback: (props: any) => void) {
  const request = new XMLHttpRequest();
  request.onload = function () {
    const fileReader = new FileReader();
    fileReader.onloadend = function () {
      callback(fileReader.result);
    };
    fileReader.readAsDataURL(request.response);
  };
  request.open("GET", url);
  request.responseType = "blob";
  request.send();
}
