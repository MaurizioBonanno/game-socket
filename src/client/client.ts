import * as THREE from '/build/three.module.js';

class World extends THREE.Scene {
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    constructor(){
        super();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth,window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }
}
class Client {
    private socket: SocketIOClient.Socket
    private world: World;
    constructor() {
        this.socket = io();
        
        this.socket.on("message", function (message: any) {
            console.log(message)
            document.body.innerHTML = message
            this.world = new World();
        })
    }    
}

const client = new Client();