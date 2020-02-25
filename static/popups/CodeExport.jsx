import _ from "lodash";
import PropTypes from "prop-types";
import React from "react";

import { RemovableError } from "../RemovableError";
import { buildURL } from "../actions/url-utils";
import { fetchJson } from "../fetcher";

const BASE_CODE_URL = "/dtale/code-export";

class CodeExport extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, code: null };
    this.renderCopyToClipboard = this.renderCopyToClipboard.bind(this);
  }

  componentDidMount() {
    fetchJson(buildURL(`${BASE_CODE_URL}/${this.props.dataId}`), codeData => {
      const newState = { error: null, code: null };
      if (codeData.error) {
        this.setState({ error: <RemovableError {...codeData} /> });
        return;
      }
      newState.code = codeData.code;
      this.setState(newState);
    });
  }

  renderCopyToClipboard() {
    if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
      const copy = e => {
        this.textArea.select();
        document.execCommand("copy");
        e.target.focus();
      };
      return (
        <div key="footer" className="modal-footer">
          <textarea
            ref={r => (this.textArea = r)}
            style={{ position: "absolute", left: "-100%" }}
            value={this.state.code || ""}
            onChange={_.noop}
          />
          <button className="btn btn-primary" onClick={copy}>
            <i className="far fa-copy pr-3" />
            <span>Copy</span>
          </button>
        </div>
      );
    }
    return null;
  }

  render() {
    if (this.state.error) {
      return (
        <div key="body" className="modal-body">
          {this.state.error}
        </div>
      );
    }
    return [
      <div key="body" className="modal-body">
        <pre>{this.state.code}</pre>
      </div>,
      this.renderCopyToClipboard(),
    ];
  }
}
CodeExport.displayName = "CodeExport";
CodeExport.propTypes = {
  dataId: PropTypes.string.isRequired,
  chartData: PropTypes.shape({
    visible: PropTypes.bool.isRequired,
  }),
};

export { CodeExport };
