import rrweb from "rrweb";

// import rrSrc from "./releases/2.0.0-alpha.4.js.src";
console.log(rrweb);
export function injectRR() {
  // const r = window.document.createElement("script");
  // r.innerHTML = rrSrc;
  // r.type = "text/javascript";
  // window.document.head.appendChild(r);
  console.log(rrweb);
  rrweb.record({
    emit: function (event) {
      console.log("rrwebRecord.emit", event);
    },
  });
}
