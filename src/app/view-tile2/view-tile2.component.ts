import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { ViewTileService } from '../service/view-tile1.service';

@Component({
  selector: 'app-view-tile2',
  templateUrl: './view-tile2.component.html',
  styleUrls: ['./view-tile2.component.css']
})
export class ViewTile2Component implements AfterViewInit {
 @ViewChild('rendererCanvas1',{static:true})rendererCanvas1!: ElementRef<HTMLElement>;

 constructor(private viewTileService: ViewTileService){}
  ngAfterViewInit() {
    this.viewTile2();

 }

  viewTile2() {
    const width = this.rendererCanvas1.nativeElement.clientWidth;
    const height = this.rendererCanvas1.nativeElement.clientHeight
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, width/ height, 0.1, 100000 );
    
    const renderer = new THREE.WebGLRenderer({
      canvas: this.rendererCanvas1.nativeElement,
      antialias: true,
      alpha: true,
        });
    renderer.setSize( width,  height);

    const loader = new THREE.TextureLoader().load('../../assets/viewtiles2.png')
    const geometry = new THREE.PlaneGeometry();
    const material = new THREE.MeshBasicMaterial( { map:loader } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    
    camera.position.z = 5;
    renderer.render( scene, camera ); 

    const animate = ()=> {    
      requestAnimationFrame(animate)
      renderer.render( scene, camera ); 
    }

    animate();
    this.viewTileService.zoomLevel.subscribe((x:any)=>{
      camera.position.z = x
     });
}


}
