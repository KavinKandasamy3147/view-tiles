import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ViewTileService } from '../service/view-tile1.service';
import * as L from 'leaflet'
@Component({
  selector: 'app-view-tile1',
  templateUrl: './view-tile1.component.html',
  styleUrls: ['./view-tile1.component.css']
})
export class ViewTile1Component implements AfterViewInit,OnChanges,OnInit,OnDestroy{
  @ViewChild('rendererCanvas1',{static:true})rendererCanvas1!: ElementRef<HTMLElement>;
  @Input() isResetZoom!: boolean;
  camera!: THREE.PerspectiveCamera;
  minFov = 10;
  maxFov = 75;
  prevMouseX = 0;
  prevMouseY = 0;
  isDragging = false;
  mesh!: THREE.Mesh;

  constructor(private viewTileService: ViewTileService){}
  private map!: L.Map; // Declare map variable

  ngOnInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([0, 0], 1); // Center at (0,0) with zoom 1

    L.tileLayer('http://3.13.59.127/colo-a-l1/{z}/{x}/{y}.png').addTo(this.map);
  }
  ngOnChanges(changes: SimpleChanges) {
   
  }

  ngAfterViewInit() {
    // this.viewTile1();
    // window.addEventListener('wheel', this.onMouseWheel);
    // window.addEventListener('mousedown', this.onMouseDown);
    // window.addEventListener('mousemove', this.onMouseMove);
    // window.addEventListener('mouseup', this.onMouseUp);

    // this.viewTileService.zoomLevel$.subscribe((X)=>{
    //   this.isResetZoom = X;
    //   if(this.isResetZoom == true){
    //       this.camera.fov = this.maxFov ;
    //     this.camera.updateProjectionMatrix();

    //   }
    // });
 }

  viewTile1() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const scene = new THREE.Scene();
     this.camera = new THREE.PerspectiveCamera( 75, width/ height, 1, 10000 );
    
    const renderer = new THREE.WebGLRenderer({
      canvas: this.rendererCanvas1.nativeElement,
      antialias: true,
      alpha: true,
        });
    renderer.setSize( width,  height);

    const loader = new THREE.TextureLoader().load('../../assets/view-tile.png')
    const geometry = new THREE.PlaneGeometry(5,3);
    const material = new THREE.MeshBasicMaterial( { map:loader } );
    this.mesh = new THREE.Mesh( geometry, material );
    scene.add( this.mesh );
    
    this.camera.position.z = 5;
    renderer.render( scene, this.camera ); 

    const animate = ()=> {    
      requestAnimationFrame(animate)
      renderer.render( scene, this.camera ); 
    }

    animate();

    const controls = new OrbitControls(this.camera,renderer.domElement);
    controls.enableRotate = false;
    
    controls.update();
    this.viewTileService.zoomLevel.subscribe((x:any)=>{
     this.camera.position.z = x
    });

  } 

  onMouseWheel = (event: WheelEvent) => {
    let newFov = this.camera.fov + event.deltaY * 0.05;
    if (newFov >= 15 && newFov <= this.maxFov) {
      this.camera.fov = newFov;
      console.log(this.camera.fov);
      this.camera.updateProjectionMatrix();
    }
  };
  onMouseDown = (event: MouseEvent) => {
    this.isDragging = true;
    this.prevMouseX = event.clientX;
    this.prevMouseY = event.clientY;
  };

  onMouseMove = (event: MouseEvent) => {
    if (!this.isDragging) return;

    const deltaX = (event.clientX - this.prevMouseX) * 0.01;
    const deltaY = (event.clientY - this.prevMouseY) * 0.01;

    this.mesh.position.x += deltaX; 
    this.mesh.position.y -= deltaY; 
    this.prevMouseX = event.clientX;
    this.prevMouseY = event.clientY;
  };

  onMouseUp = () => {
    this.isDragging = false;
  };
  ngOnDestroy(): void {
    window.removeEventListener('wheel', this.onMouseWheel);
    window.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.onMouseUp);
  }
}