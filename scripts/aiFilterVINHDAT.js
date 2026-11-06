// VINHDAT AI Filter adapter - adapted from filterclassic.js / testfilter.js.
// No external Worker, UID registration, fabricated HTTP status or subscription changes.
// This only adjusts existing filter metadata; it cannot generate AI images or bypass server authorization.
(function () {
  "use strict";
  if (typeof $response === "undefined" || typeof $response.body !== "string") {
    $done({}); return;
  }
  var data;
  try { data = JSON.parse($response.body); } catch (_) { $done({}); return; }
  var modified = false;
  function walk(node, depth) {
    if (!node || typeof node !== "object" || depth > 14) return;
    if (Array.isArray(node)) { node.forEach(function (item) { walk(item, depth + 1); }); return; }
    // Only modify metadata objects that actually describe filters.
    var filterNode = ["filter_id", "filterId", "filter_type", "filterType", "filter_name", "filterName", "filter_prompt", "filterPrompt"].some(function (k) { return k in node; });
    if (filterNode) {
      ["is_blurred", "blurred", "is_locked", "locked"].forEach(function (k) {
        if (k in node && node[k] !== false) { node[k] = false; modified = true; }
      });
      ["can_view", "is_unlocked"].forEach(function (k) {
        if (k in node && node[k] !== true) { node[k] = true; modified = true; }
      });
      var clear = node.unblurred_url || node.unlocked_url || node.result_url;
      if (typeof clear === "string" && /^https:\/\//.test(clear) && "blurred_url" in node) {
        node.blurred_url = clear; modified = true;
      }
    }
    Object.keys(node).forEach(function (k) { walk(node[k], depth + 1); });
  }
  walk(data, 0);
  $done(modified ? {body: JSON.stringify(data)} : {});
})();
