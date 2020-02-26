import { mount } from "enzyme";
import React from "react";

import * as t from "../jest-assertions";
import { buildInnerHTML, withGlobalJquery } from "../test-utils";

describe("CodePopup tests", () => {
  test("CodePopup test", done => {
    const { CodePopup } = withGlobalJquery(() => require("../../popups/CodePopup"));
    buildInnerHTML();

    const result = mount(<CodePopup code="test code" />, {
      attachTo: document.getElementById("content"),
    });
    result.render();
    t.equal(result.find("pre").text(), "test code");
    done();
  });
});
