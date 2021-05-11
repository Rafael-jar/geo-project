import "../static/assets/css/fonts.css";
import "../static/assets/css/style.css";
import "../static/assets/css/grid.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import ScrollMagic from "scrollmagic";
import { TweenMax, Linear, TimelineMax } from "gsap";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";

ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);

var scale_tween = TweenMax.to("#intro", 1, {
  ease: Linear.easeNone,
  scale: 2,
  opacity: 0,
});
var controller = new ScrollMagic.Controller();

// Scale Scene
var scale_scene = new ScrollMagic.Scene({
  triggerElement: "#intro",
  triggerHook: 0,
  duration: "100%",
}).setTween(scale_tween);

var slide2section1 = TweenMax.to("#section1slide2", 1, {
  ease: Linear.easeNone,
  opacity: 1,
});
var controller = new ScrollMagic.Controller();

// Scale Scene
var scenslide2section1 = new ScrollMagic.Scene({
  triggerElement: "#triggerearth",
}).setPin("#section1slide2 .el");

var scenslide2section1op = new ScrollMagic.Scene({
  triggerElement: "#triggeropacity",
}).setTween(slide2section1);

var slide2sec1 = TweenMax.to("html", 1, {
  ease: Linear.easeNone,
  backgroundColor: "#3256a8",
});
var scenslide2sec1 = new ScrollMagic.Scene({
  triggerElement: "#section1slide2",
}).setTween(slide2sec1);

// ----- THE EARTH ------

var width = document.getElementById("earth").offsetWidth,
  height = document.getElementById("earth").offsetHeight;

var webglEl = document.getElementById("earth");

// Earth params
var radius = 0.5,
  segments = 32,
  rotation = 6;

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
camera.position.z = 1.5;

var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(width, height);
scene.add(new THREE.AmbientLight(0x333333));

var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1.5);
scene.add(light);

var sphere = createSphere(radius, segments);
sphere.rotation.y = rotation;
scene.add(sphere);

var clouds = createClouds(radius, segments);
clouds.rotation.y = rotation;
scene.add(clouds);

webglEl.appendChild(renderer.domElement);

render();

function render() {
  clouds.rotation.y += 0.00005;
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

function createSphere(radius, segments) {
  return new THREE.Mesh(
    new THREE.SphereGeometry(radius, segments, segments),
    new THREE.MeshPhongMaterial({
      map: THREE.ImageUtils.loadTexture("./assets/images/8081_earthmap10k.jpg"),
      bumpMap: THREE.ImageUtils.loadTexture(
        "../assets/images/elev_bump_4k.jpg"
      ),
      bumpScale: 0.005,
      specularMap: THREE.ImageUtils.loadTexture("./assets/images/water_4k.png"),
      specular: new THREE.Color("grey"),
    })
  );
}

function createClouds(radius, segments) {
  return new THREE.Mesh(
    new THREE.SphereGeometry(radius + 0.003, segments, segments),
    new THREE.MeshPhongMaterial({
      map: THREE.ImageUtils.loadTexture("./assets/images/fair_clouds_4k.png"),
      transparent: true,
    })
  );
}

var cameramovement = new TweenMax.to(camera.position, {
  x: 0.195,
  y: 0.55,
  z: 0.135,
  onUpdate: function () {
    camera.lookAt(sphere.position);
  },
});

var cam_moove = new ScrollMagic.Scene({
  triggerElement: "#triggerearthmoove",
  triggerHook: 0,
  duration: "100%",
}).setTween(cameramovement);

var settinginframe = TweenMax.to(".el", 1, {
  ease: Linear.easeNone,
  scale: 0.3,
  top: "30%",
  left: "30%",
});

var settinginframf = new ScrollMagic.Scene({
  triggerElement: ".frame",
  triggerHook: 0,
  duration: "100%",
})
  .setTween(settinginframe)
  .setPin(".frame");

controller.addScene([
  scale_scene,
  scenslide2section1,
  scenslide2sec1,
  cam_moove,
  scenslide2section1op,
  settinginframf,
]);

function convertLatLonToVec3(lat, lon) {
  lat = (lat * Math.PI) / 180.0;
  lon = (-lon * Math.PI) / 180.0;
  return new THREE.Vector3(
    Math.cos(lat) * Math.cos(lon),
    Math.sin(lat),
    Math.cos(lat) * Math.sin(lon)
  );
}
