import "../static/assets/css/fonts.css";
import "../static/assets/css/style.css";
import "../static/assets/css/grid.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import $ from "jquery";
import ScrollMagic from "scrollmagic";
import { TweenMax, Linear, TimelineMax } from "gsap";
import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";

var playingaudio = false;

var cycling = false;

function play(audio) {
  if (!playingaudio) {
    playingaudio = true;

    audio.play();
    audio.addEventListener("ended", function () {
      playingaudio = false;
    });
  } else {
    var intervalId = window.setInterval(function () {
      if (!playingaudio) {
        playingaudio = true;
        audio.play();
        audio.addEventListener("ended", function () {
          playingaudio = false;
        });
        clearInterval(intervalId);
      }
    }, 1000);
  }
}

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
  onComplete: function () {
    var audio = new Audio("./assets/audio/intro.mp3");
    play(audio);
  },
});
var controller = new ScrollMagic.Controller();

// Scale Scene
var scenslide2section1 = new ScrollMagic.Scene({
  triggerElement: "#triggerearth",
  duration: "600%",
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
THREE.ImageUtils.crossOrigin = "anonymous";

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
      bumpMap: THREE.ImageUtils.loadTexture("./assets/images/elev_bump_4k.jpg"),
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

var settinginframe = TweenMax.to("#section1slide2 #earth canvas", 1, {
  ease: Linear.easeNone,
  width: "50vw",
  height: "50vh",
  onComplete: function () {
    $("#section1slide2 .el").addClass("section-centered");
    $("#section1slide2 .el .fullcard").addClass("center-fullcard");
    $("#section1slide2 .el .fullcard").css("background-color", "white");
    $("#section1slide2 #earth").css("width", "auto");
    $("#section1slide2 #earth").css("height", "auto");
    $("#section1slide2 #earth canvas").css(
      "border-radius",
      "15px 0px 0px 15px"
    );
  },
  onReverseComplete: function () {
    $("#section1slide2 .el .fullcard").removeClass("center-fullcard");
    $("#section1slide2 .el").removeClass("section-centered");
    $("#section1slide2 #earth").css("width", "100vw");
    $("#section1slide2 #earth").css("height", "100vh");
    $("#section1slide2 #earth canvas").css("border-radius", "0px");
    $("#section1slide2 .el .fullcard").css("background-color", "transparent");
  },
});

var settinginframf = new ScrollMagic.Scene({
  triggerElement: "#earthend",
  triggerHook: 0,
  duration: "100%",
}).setTween(settinginframe);
controller.addScene([
  scale_scene,
  scenslide2section1,
  scenslide2sec1,
  cam_moove,
  scenslide2section1op,
  settinginframf,
]);

/* Volcano */

var scenslide2section1 = new ScrollMagic.Scene({
  triggerElement: "#triggervolcano",
  duration: "300%",
})
  .setPin("#section1slide3 .el")
  // .setTween(
  //   new TweenMax.to("#slide3", 1, {
  //     onComplete: function () {
  //       $("#slide3").css("transform", "translateY(-200vh)");
  //     },
  //   })
  // )
  .addTo(controller);
var volcanochange1 = new ScrollMagic.Scene({
  triggerElement: "#triggervolcanostage2",
  duration: "1vh",
})
  .setTween(
    new TweenMax.to("#volcano", 1, {
      onComplete: function () {
        $("#volcano img").attr("src", "./assets/images/volcanostages/zoom.PNG");
      },
      onReverseComplete: function () {
        $("#volcano img").attr(
          "src",
          "./assets/images/volcanostages/gmaps.PNG"
        );
      },
    })
  )
  .addTo(controller);

var volcanochange2 = new ScrollMagic.Scene({
  triggerElement: "#triggervolcanostage3",
  duration: "1vh",
})
  .setTween(
    new TweenMax.to("#volcano", 1, {
      onComplete: function () {
        $("#volcano img").attr(
          "src",
          "./assets/images/volcanostages/volcan.JPG"
        );
      },
      onReverseComplete: function () {
        $("#volcano img").attr("src", "./assets/images/volcanostages/zoom.PNG");
      },
    })
  )
  .addTo(controller);

/* Volcano 2.0*/

var volcano2Pin = new ScrollMagic.Scene({
  triggerElement: "#trigger-volcano",
  duration: "500%",
})
  .setPin(".slide3")
  .setTween(
    new TweenMax.to("#trigger-volcano", 1, {
      onStart: function () {
        var audio = new Audio("./assets/audio/volc1.mp3");
        play(audio);
      },
    })
  )
  .addTo(controller);

var volcanoplatemoove = new ScrollMagic.Scene({
  triggerElement: "#triggerplates",
})
  .setTween(
    new TweenMax.to("#triggerplates", 1, {
      onStart: function () {
        var audio = new Audio("./assets/audio/volc2.mp3");
        play(audio);

        cycling = true;
        const interval = setInterval(function () {
          if (cycling) {
            if ($("#plate-left").hasClass("movingRight")) {
              $("#plate-left").addClass("movingLeft");
              $("#plate-left").removeClass("movingRight");
            } else {
              $("#plate-left").addClass("movingRight");
              $("#plate-left").removeClass("movingLeft");
            }

            if ($("#plate-right").hasClass("movingLeft")) {
              $("#plate-right").addClass("movingRight");
              $("#plate-right").removeClass("movingLeft");
            } else {
              $("#plate-right").addClass("movingLeft");
              $("#plate-right").removeClass("movingRight");
            }
          } else {
            $("#plate-right").removeClass("movingRight");
            $("#plate-right").removeClass("movingLeft");

            $("#plate-left").removeClass("movingRight");
            $("#plate-left").removeClass("movingLeft");
            clearInterval(interval);
          }
        }, 1000);
      },
      onReverseComplete: function () {
        cycling = false;
      },
    })
  )
  .addTo(controller);

var volcanoplatemoove = new ScrollMagic.Scene({
  triggerElement: "#triggerlavafilling",
  triggerHook: 0,
  duration: "100%",
  reverse: true,
})
  .setTween(
    new TweenMax.to("#volcano-lava", 2, {
      marginTop: "0%",
      onStart: function () {
        console.log("found1");
        play(new Audio("./assets/audio/volc3.mp3"));
      },
      onComplete: function () {
        console.log("found3");
        play(new Audio("./assets/audio/volc4.mp3"));
      },
    })
  )
  .addTo(controller);

var volcanoplatemoove = new ScrollMagic.Scene({
  triggerElement: "#triggerclouds",
  triggerHook: 0,
  duration: "100%",
  reverse: true,
})
  .setTween(
    new TweenMax.to("#clouds1", 2, {
      height: "60vh",
    })
  )
  .addTo(controller);

var cardpinner = new ScrollMagic.Scene({
  triggerElement: "#cardpin",
  duration: "200%",
  onComplete: function () {
    console.log("complete");
    $("#slide5").css("transform", "translateY(100%)");
  },
  onReverseComplete: function () {
    $("#slide5").css("transform", "translateY(0)");
  },
})
  .setPin("#section4slide1 .el")
  .addTo(controller);
