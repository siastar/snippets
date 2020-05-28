import React,{useState,useEffect} from "react";
import Modal from "react-responsive-modal";
import { EditorState,convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import _ from 'lodash';
import htmlToDraft from 'html-to-draftjs';
import axios from 'axios';


const onSubmitHandler = (titleState,editorState,rowData) => {
  const {_id} = rowData; 
  const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
  const data = {_id,title:titleState,content}
  axios.post('/api/infopages/u',data)

}


const ContentModal = props => {
  const { openModal, onCloseModal,rowData } = props;
  
  const [titleState,setTitleState] = useState(undefined);
  const [editorState,setEditorState] = useState(EditorState.createEmpty);
  const [editorIntialized,setEditorInitialized] = useState(false);


  useEffect(()=>{
    if(_.isObject(rowData) && !editorIntialized){
      const editorIntialized = true;
      const {title,content} = rowData;
      const blocksFromHtml = htmlToDraft(content);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      const editorState = EditorState.createWithContent(contentState);

      setTitleState(title);
      setEditorState(editorState);
      setEditorInitialized(editorIntialized);
    }
  })






  return (
    <Modal
      open={openModal}
      onClose={() => {
        onCloseModal();
      }}
      center
    >
      <div className="modal-header">Edit Content</div>
      <div className="modal-body">
        saving the content will reflect changes on mobile app.
      </div>
      
      <div className="card-body">
        <form>
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <label for="id">Title</label>
                <input
                  name="id"
                  type="text"
                  className="form-control"
                  value={titleState}
                  placeholder="Title"
                  onChange = {(e) => setTitleState(e.currentTarget.value)}
                />
              </div>
            </div>
            <div className="col-sm-12">
              <div className="form-group">
                <label for="category">Content</label>
                <Editor
                  editorState={editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={(editorState) => {setEditorState(editorState)}}
                  maxHeight = {100}
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-success"
          data-dismiss="modal"
          onClick={() => {
            onSubmitHandler(titleState,editorState,rowData);
          }}
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

export default ContentModal;
