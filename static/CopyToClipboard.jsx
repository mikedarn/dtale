import $ from "jquery";
import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";

import { JSAnchor } from "./JSAnchor";

function canCopy() {
  return document.queryCommandSupported && document.queryCommandSupported("copy");
}

function renderCopyToClipboardAnchor(text, key = 0) {
  if (canCopy()) {
    const buttonBuilder = props => (
      <JSAnchor {...props}>
        <i className="far fa-copy pr-3" />
        <span>Copy Code</span>
      </JSAnchor>
    );
    return <CopyToClipboard key={key} text={text || ""} buttonBuilder={buttonBuilder} />;
  }
  return null;
}

class CopyToClipboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (canCopy()) {
      const copy = e => {
        this.textArea.select();
        document.execCommand("copy");
        e.target.focus();
        $(e.target).parent().parent().find("div.copy-tt")
          .fadeIn(300)
          .delay(300)
          .fadeOut(400);
      };
      return [
        <textarea
          key={0}
          ref={r => (this.textArea = r)}
          style={{ position: "absolute", left: -1 * window.innerWidth }}
          value={this.props.text || ""}
          onChange={_.noop}
        />,
        <div key="copy-btn" className="hoverable-click">
          {this.props.buttonBuilder({ onClick: copy })}
          <div className="hoverable__content copy-tt">{"Copied to clipboard"}</div>
        </div>,
      ];
    }
    return null;
  }
}
CopyToClipboard.displayName = "CopyToClipboard";
CopyToClipboard.propTypes = {
  text: PropTypes.string,
  buttonBuilder: PropTypes.func,
};

export { CopyToClipboard, canCopy, renderCopyToClipboardAnchor };
