import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFileList } from '../actions';

let MyWorker = require("worker-loader!../workers/test.js");


class FileList extends Component {
  constructor(...args) {
    super(...args);
    this.worker = new MyWorker;
  }
  componentWillMount() {
    const { getFileList } = this.props;
    getFileList();
  }
  downloadFile = (e) => {
    e.preventDefault();
    const {
      fileList: {
        items
      }
    } = this.props;
    const id = e && e.target && e.target.dataset && +e.target.dataset.id;
    const file = items.find(item => item.id === id);
    this.worker.postMessage({
      fileName: file.name,
      url: file.url,
    });
  };
  render() {
    const {
      fileList,
      fileList: {
        items
      }
    } = this.props;
    const isReady = fileList && !fileList.isFetching && items;
    this.worker.onmessage = e => window.location.href = e.data;
    return(
      <div className="file-list">
        {(isReady &&
        <ul>
          {items.map(file => (
            <li key={file.id}>
              <a
                href="#"
                onClickCapture={this.downloadFile}
                data-id={file.id}
              >
                {file.name}
              </a>
            </li>
          ))}
        </ul>) ||
        <span>loading...</span>
        }
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    fileList: state.files.fileList,
  }
}
export default connect(mapStateToProps, { getFileList })(FileList)