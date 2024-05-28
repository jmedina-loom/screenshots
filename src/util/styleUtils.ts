import { getThemeStylesString, getAllCssVarsString } from "@loomhq/lens";
import { cssUtilities } from "@loomhq/lens";

const style = document.createElement("style");
style.innerHTML = getThemeStylesString() + getAllCssVarsString(undefined);
document.head.appendChild(style);

const style2 = document.createElement("style");
style2.innerHTML = cssUtilities();
document.head.appendChild(style2);
