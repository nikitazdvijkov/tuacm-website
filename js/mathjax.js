var mathjax1 = document.createElement("script");
mathjax1.setAttribute("src", "https://polyfill.io/v3/polyfill.min.js?features=es6");

var mathjax2 = document.createElement("script");
mathjax2.setAttribute("src", "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js");
mathjax2.setAttribute("id", "MathJax-script");

document.body.appendChild(mathjax1);
document.body.appendChild(mathjax2);
