import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ViewTileService } from '../service/view-tile1.service';
@Component({
  selector: 'app-view-tile1',
  templateUrl: './view-tile1.component.html',
  styleUrls: ['./view-tile1.component.css']
})
export class ViewTile1Component implements AfterViewInit {
  @ViewChild('rendererCanvas1',{static:true})rendererCanvas1!: ElementRef<HTMLElement>;
  camera!: THREE.PerspectiveCamera;
  minFov = 10;
  maxFov = 75;

  constructor(private viewTileService: ViewTileService){}
  ngAfterViewInit() {
    this.viewTile1();
    window.addEventListener('wheel', this.onMouseWheel);

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
    const geometry = new THREE.PlaneGeometry(3,3);
    const material = new THREE.MeshBasicMaterial( { map:loader } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    
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

  } zoomIn(){
    this.camera.updateProjectionMatrix();
  }
  onMouseWheel = (event: WheelEvent) => {
    let newFov = this.camera.fov + event.deltaY * 0.05;
    if (newFov >= 15 && newFov <= this.maxFov) {
      this.camera.fov = newFov;
      console.log(this.camera.fov);
      this.camera.updateProjectionMatrix();
    }
  };

}