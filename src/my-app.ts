import "@material/web/button/filled-button"
import "@material/web/textfield/filled-text-field"
import "@material/web/switch/switch"
import "@material/web/checkbox/checkbox"
import "@material/web/segmentedbuttonset/outlined-segmented-button-set"
import "@material/web/segmentedbutton/outlined-segmented-button"
import "@material/web/divider/divider"
import "@material/web/iconbutton/standard-icon-button"

import Peer from "peerjs";

export class MyApp {
  private _peerId:string
  private readonly _peer

  constructor() {
    this._peer = new Peer()
    this._peer.on('open', id => {
      console.log('My peer ID is: ' + id);
      this._peerId = id
    });
  }

  private _openPeer() {
    console.log("Starting peer")
  }

  private _connectPeer() {
    const conn = this._peer.connect(this._peerId)
    conn.on('open', () => {
      // Receive messages
      conn.on('data', function(data) {
        console.log('Received', data);
      });

      // Send messages
      conn.send('Hello!');
    });
  }

  private _sharePeerId() {
    navigator.share({
      text: this._peerId
    })
  }
}
