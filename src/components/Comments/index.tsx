export function Comments() {
  return (
    <section
      ref={(elem) => {
        if (!elem || elem.childNodes.length) {
          return;
        }

        const scriptElem = document.createElement("script");
        scriptElem.src = "https://utteranc.es/client.js";
        scriptElem.async = true;
        scriptElem.crossOrigin = "anonymous";
        scriptElem.setAttribute("repo", "vhnakai/bm");
        scriptElem.setAttribute("issue-term", "pathname");
        scriptElem.setAttribute("label", "blog-comment");
        scriptElem.setAttribute("theme", "boxy-light");
        elem.appendChild(scriptElem);
      }}
    />
  );
}
