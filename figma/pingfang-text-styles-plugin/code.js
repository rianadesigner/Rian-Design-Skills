/**
 * 将所有「本地 Text styles」的字体改为 PingFang SC；
 * 若当前有选中容器（Frame/Section/Component 等），同时把其子孙里的 TEXT 图层改为 PingFang SC（含混排分段）。
 * 使用：Figma → Plugins → Development → Import plugin from manifest… → 选本目录 manifest.json → 运行插件。
 */
var TARGET_FAMILY = "PingFang SC";

/** 将常见西文字重映射到苹方可用 style（按英文 Figma 字体菜单为准，可按需改） */
function mapPingFangStyle(oldStyle) {
  var s = String(oldStyle || "Regular").toLowerCase();
  if (s.indexOf("black") !== -1 || s.indexOf("heavy") !== -1) return "Semibold";
  if (s.indexOf("bold") !== -1) return "Semibold";
  if (s.indexOf("semi") !== -1 || s.indexOf("demi") !== -1) return "Semibold";
  if (s.indexOf("medium") !== -1) return "Medium";
  if (s.indexOf("light") !== -1 && s.indexOf("ultra") === -1) return "Light";
  if (s.indexOf("thin") !== -1 || s.indexOf("ultra") !== -1) return "Ultralight";
  if (s.indexOf("italic") !== -1) return "Regular";
  return "Regular";
}

function tryLoad(family, style) {
  return figma.loadFontAsync({ family: family, style: style });
}

async function applyTextStyleFont(st) {
  var mapped = mapPingFangStyle(st.fontName && st.fontName.style);
  try {
    await tryLoad(TARGET_FAMILY, mapped);
    st.fontName = { family: TARGET_FAMILY, style: mapped };
    return { ok: true };
  } catch (e1) {
    try {
      await tryLoad(TARGET_FAMILY, "Regular");
      st.fontName = { family: TARGET_FAMILY, style: "Regular" };
      return { ok: true, fallback: true };
    } catch (e2) {
      return { ok: false, name: st.name, err: String(e2.message || e2) };
    }
  }
}

async function setTextNodeToPingFang(node) {
  if (node.fontName === figma.mixed) {
    var segments = node.getStyledTextSegments(["fontName"]);
    var offset = 0;
    for (var i = 0; i < segments.length; i++) {
      var seg = segments[i];
      var mapped = mapPingFangStyle(seg.fontName.style);
      try {
        await tryLoad(TARGET_FAMILY, mapped);
      } catch (_) {
        await tryLoad(TARGET_FAMILY, "Regular");
        mapped = "Regular";
      }
      node.setRangeFontName(offset, offset + seg.characters.length, {
        family: TARGET_FAMILY,
        style: mapped,
      });
      offset += seg.characters.length;
    }
    return;
  }
  var mapped = mapPingFangStyle(node.fontName.style);
  try {
    await tryLoad(TARGET_FAMILY, mapped);
    node.fontName = { family: TARGET_FAMILY, style: mapped };
  } catch (_) {
    await tryLoad(TARGET_FAMILY, "Regular");
    node.fontName = { family: TARGET_FAMILY, style: "Regular" };
  }
}

function walkTextChildren(n, acc) {
  if (n.type === "TEXT") {
    acc.push(n);
    return;
  }
  if ("children" in n) {
    for (var i = 0; i < n.children.length; i++) {
      walkTextChildren(n.children[i], acc);
    }
  }
}

(async function main() {
  var styleResults = { ok: 0, fail: 0, errors: [] };
  var styles = await figma.getLocalTextStylesAsync();
  for (var si = 0; si < styles.length; si++) {
    var r = await applyTextStyleFont(styles[si]);
    if (r.ok) styleResults.ok++;
    else {
      styleResults.fail++;
      styleResults.errors.push(r.name + ": " + r.err);
    }
  }

  var textOk = 0;
  var textFail = 0;
  var sel = figma.currentPage.selection;
  if (sel.length > 0) {
    var texts = [];
    for (var j = 0; j < sel.length; j++) {
      walkTextChildren(sel[j], texts);
    }
    for (var t = 0; t < texts.length; t++) {
      try {
        await setTextNodeToPingFang(texts[t]);
        textOk++;
      } catch (e) {
        textFail++;
        styleResults.errors.push(texts[t].name + " (图层): " + String(e.message || e));
      }
    }
  }

  var msg =
    "Text styles: " +
    styleResults.ok +
    " 已改为 " +
    TARGET_FAMILY +
    (styleResults.fail ? "，失败 " + styleResults.fail : "");
  if (sel.length > 0) {
    msg += " | 选中范围内文本图层: " + textOk + " 已更新";
    if (textFail) msg += "，失败 " + textFail;
  } else {
    msg += "（未选中画框则跳过画布上的裸文本；可选中 Typography 帧再运行一次）";
  }
  figma.notify(msg, { timeout: 5000 });
  if (styleResults.errors.length) {
    console.warn("[PingFang plugin]", styleResults.errors.join("\n"));
  }
  figma.closePlugin();
})();
