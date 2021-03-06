/* DRAFT: TEXT EDITOR CORE */

import * as React from "react";

//Draftjs
import { Editor as DraftEditor, EditorState } from "draft-js";

import { AppState } from "../../store";

import Icon from "../toolBar/icon";

import { SafeWrapper } from "../common";

//Draftjs Details
import {
  getCursorStart,
  getCursorNumSelection,
  getNumCharacters
} from "./details";

//Style Map
import createStyle from "../toolBar/inlineStyle";
import { EventEmitter } from "events";

//State to HTML
import { stateToHTML } from "draft-js-export-html";
//HTML to State
import { stateFromHTML } from "draft-js-import-html";
//Custom Draftjs Export HTML Options
import exportOptions from "./exportOptions";
//Custom Import Options
import importOptions, { customBlockRenderMap } from "./importOptions";

//TODO: Temp
import Decorators from "./decorators";

import { parseSizeStr } from "../../utils/";
import { DEFAULT_CONFIG } from "../../editorConfig";

export interface DraftProps {
  appState?: AppState;
  isEditorResizable?: boolean;
  allowHTMLExport?: boolean;

  height?: string;
  maxHeight?: string;
  minHeight?: string;

  setAppState?: (newState: any, callback?: () => void) => void;

  //Events
  on?: (
    eventName: string,
    handler: (appState: AppState, ...args: any[]) => void
  ) => EventEmitter;
  emit?: (eventName: string, ...args: any[]) => boolean;
}

export interface DraftState {
  width?: number;
  height: number;

  isResizeMouseDown: boolean;
  mouseOffsetY: number;

  allowEditorResize: boolean;

  html: string;
}

export default class Draft extends React.Component<DraftProps, DraftState> {
  state: DraftState;
  editor: DraftEditor;
  draftEditor: HTMLDivElement;
  onTextChangeCallback: (newText: string, HTML: string) => void = null;

  static defaultProps = {
    isEditorResizable: true,
    allowHTMLExport: true
  };

  constructor(props: DraftProps) {
    super(props);
    this.state = {
      height: props.height
        ? parseSizeStr(props.height)
        : parseSizeStr(DEFAULT_CONFIG.initialHeight),
      isResizeMouseDown: false,
      allowEditorResize: true,
      mouseOffsetY: 0,
      html: ""
    };
  }

  updateDraftEditor(newEditorState: EditorState) {
    //Update Editor State & Run the onChange Callback (text, HTML) if it does exist
    this.props.setAppState({ editorState: newEditorState }, () =>
      this.onTextChangeCallback
        ? this.onTextChangeCallback(
            newEditorState.getCurrentContent().getPlainText(),
            this.getHTML()
          )
        : undefined
    );
  }

  componentDidMount() {
    //Choose weather to add new line at the End (So You could add more text after inserting a block or a style).
    //Draft Childs Container (The Sub Container of all text and blocks get typed on the draft editor)
    let container = document.querySelector("[data-contents=true]");
    //Insert New Line After Last Item on the List (Last Children on the Container)
    let lastItem = container.children.item(container.children.length - 1);

    //Register RETURN KEY HANDLER
    window.addEventListener("keydown", e => {
      switch (e.key) {
        case "Enter":
          //this.updateDraftEditor(insertBlock(this.props.appState.editorState));
          break;
      }
    });

    //Set Editor Reference on the Main State (AppState)
    this.props.setAppState({ editor: this.editor });
  }

  componentWillMount() {
    /* Resize Editor Events */
    document.addEventListener("mousemove", this.onResizeMouseMove.bind(this));
    document.addEventListener("mouseup", this.onResizeMouseUp.bind(this));
  }

  onResizeMouseDown(e: React.MouseEvent) {
    this.setState({
      isResizeMouseDown: true,
      mouseOffsetY:
        e.clientY - (e.currentTarget as HTMLElement).getBoundingClientRect().top
    });
  }

  onResizeMouseMove(e: React.MouseEvent) {
    const { minHeight } = this.props;
    e.preventDefault();
    //Mouse is Down and Editor is Resizble
    if (
      this.state.isResizeMouseDown &&
      this.props.isEditorResizable &&
      this.state.allowEditorResize
    ) {
      const currentHeight: number = parseInt(
        this.draftEditor.style.height.slice(
          0,
          this.draftEditor.style.height.indexOf("px")
        )
      );
      //Offset from the document (needed when having y-overflow)
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      //Calculate new Height with some custom offset
      let height = e.clientY - this.state.mouseOffsetY - 130 + scrollTop;
      //Make sure than height doesn't go below the minHeight (initialHeight)
      if (minHeight && height < parseSizeStr(minHeight)) return;
      this.draftEditor.style.height = height + "px";
    }
  }

  onResizeMouseUp() {
    this.setState({ isResizeMouseDown: false });
  }

  public setEditorHeight(newHeight: string) {
    //Set Editor's height
    this.draftEditor.style.height = newHeight;
  }

  public setEditorMaxHeight(maxHeight: string) {
    if (!maxHeight || maxHeight == "") return;
    this.draftEditor.style.maxHeight = maxHeight;
  }

  public enableEditorResize() {
    this.setState({ allowEditorResize: true });
  }

  public disableEditorResize() {
    this.setState({ allowEditorResize: false });
  }

  private onEditorFocus() {
    this.props.setAppState({ editorHasFocus: true });
  }

  private onEditorBlur() {
    this.props.setAppState({ editorHasFocus: false });
  }
  //HTML Text Area (Insertion or Update) (Convert HTML to EditorState)
  onHTMLEditorChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    //convert EditorState to HTML using Editor Custom Styles and Entities
    const contentState = stateFromHTML(e.target.value, {
      customInlineFn: (element, inlineCreators) =>
        importOptions(element as HTMLElement, inlineCreators)
    });

    // Make sure to create EditorState from Content using the Default Decorators
    // (Otherwise you will get no HTML to State conversion with no errors).
    const newEditorState = EditorState.createWithContent(
      contentState,
      Decorators(this.props.emit, this.props.on)
    );
    //Apply New EditorState with New HTML
    this.updateDraftEditor(newEditorState);
  }

  public getHTML(): string {
    //Make sure that HTML Exporting is Allowed!
    return this.props.allowHTMLExport
      ? this.exportHTML()
      : "HTML EXPORT IS DISABLED!";
  }

  public getText(): string {
    //Plain Text
    return this.props.appState.editorState.getCurrentContent().getPlainText();
  }

  public onTextChange(callback: (newText: string, HTML: string) => void) {
    this.onTextChangeCallback = callback;
  }

  private exportHTML(): string {
    //export HTML into State
    const { appState } = this.props;
    const { editorState } = appState;
    //Current Content
    const contentState = editorState.getCurrentContent();
    //Get Inlines style for blocks
    const currentInlineStyles = createStyle.exporter(appState.editorState);
    const html: string = stateToHTML(contentState, {
      inlineStyles: currentInlineStyles,
      entityStyleFn: exportOptions.entityStyleFn,
      blockRenderers: exportOptions.blockRenderers(contentState)
    });

    return html;
  }

  render() {
    //Quick Extract
    const { appState, allowHTMLExport, maxHeight, minHeight } = this.props;
    //export HTML into State
    const html = appState.showDraftHTML ? this.getHTML() : "<p></p>";

    return (
      <SafeWrapper style={{ position: "relative", flexDirection: "column" }}>
        <div
          className="draft ip-scrollbar-v2"
          onClick={() => !appState.showDraftHTML && this.editor.focus()}
          style={{ height: this.state.height, maxHeight, minHeight: minHeight }}
          ref={draft => (this.draftEditor = draft)}
        >
          {!appState.showDraftHTML && (
            <div id="main-draft-container" className="draft-container">
              <DraftEditor
                customStyleFn={createStyle.customStyleFn}
                blockRenderMap={customBlockRenderMap}
                editorState={appState.editorState}
                ref={editor => (this.editor = editor)}
                onChange={this.updateDraftEditor.bind(this)}
                onFocus={this.onEditorFocus.bind(this)}
                onBlur={this.onEditorBlur.bind(this)}
                placeholder="Explore Your Way In..."
                spellCheck={true}
              />
            </div>
          )}
          {appState.showDraftHTML && (
            <div className="draft-html-container">
              <textarea
                name="draftHtml"
                id="draftHtml"
                className="ip-scrollbar-v2"
                defaultValue={html}
                onChange={this.onHTMLEditorChange.bind(this)}
                disabled={!allowHTMLExport}
              />
            </div>
          )}
        </div>
        <div className="draft-details">
          <div style={{ marginLeft: "5px" }}>
            Col {getCursorStart(appState.editorState)}
          </div>
          <div style={{ marginLeft: "16px" }}>
            Selected{" "}
            {getCursorNumSelection(appState.editorState)
              ? getCursorNumSelection(appState.editorState)
              : 0}
          </div>
          <div style={{ marginLeft: "17px" }}>
            {getNumCharacters(appState.editorState) > 1
              ? getNumCharacters(appState.editorState) + " Chars"
              : getNumCharacters(appState.editorState) + " Char"}
          </div>
          {appState.showDraftHTML && (
            <div style={{ marginLeft: "17px" }}>(HTML View)</div>
          )}
          <span
            className="draft-resizer"
            onMouseDown={this.onResizeMouseDown.bind(this)}
            onMouseUp={this.onResizeMouseUp.bind(this)}
          >
            <Icon icon={"minimalArrow"} size={19} rotation={"80deg"} />
          </span>
        </div>
      </SafeWrapper>
    );
  }
}
//TODO: Add line counter for Details
