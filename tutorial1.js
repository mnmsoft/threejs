let scene, camera, renderer, cube;
function init() {

  (function () {
    var script = document.createElement("script");
    script.onload = function () {
      var stats = new Stats();
      document.body.appendChild(stats.dom);
      requestAnimationFrame(function loop() {
        stats.update();
        requestAnimationFrame(loop);
      });
    };
    script.src = "//mrdoob.github.io/stats.js/build/stats.min.js";
    document.head.appendChild(script);
  })();

  scene = new THREE.Scene();
  // PerspectiveCamera param
  // 카메라 수직시야 , 카메라 절두체 종횡비 , 평면 근처의 카메라 절두체 , 평면 먼 카메라 절두체
  // 뭔말이지!?

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  // const loader = new THREE.GLTFLoader();
  // loader.load("models/model.gltf", function (object) {
  //   scene.add(object);
  // });

  // case 1
  // const geometry = new THREE.BoxGeometry(1, 1, 1); //깊이,높이,폭
  // const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });
  // cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);
  // var pointLight = new THREE.PointLight(0x000000);
  // pointLight.position.z = 5;
  // pointLight.position.x = 100;
  // pointLight.position.y = 100;
  // scene.add(pointLight);
  // camera.position.z = 5;

  // case 2
  // const geometry = new THREE.BoxGeometry(1, 1, 1); //깊이,높이,폭
  // const texture = new THREE.TextureLoader().load('textures/dog.jpg');
  // const material = new THREE.MeshBasicMaterial({ map : texture });
  // cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);
  // camera.position.z = 5;

  // case 3
  // SphereGeometry :radius , widthSegments , heightSegments
  // 반지름,
  // const geometry = new THREE.SphereGeometry(6, 32, 32); //깊이,높이,폭
  // const texture = new THREE.TextureLoader().load('textures/map.jpg');
  // const material = new THREE.MeshBasicMaterial({ map : texture });
  // cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);
  // camera.position.z = 30;

  //case 4
  // const geometry = new THREE.BoxGeometry(1, 1, 1); //깊이,높이,폭
  // const cubeMaterials = [
  //   new THREE.MeshBasicMaterial( { color : 0xff0000 , side : THREE.DoubleSide } ), // RIGHT SIDE
  //   new THREE.MeshBasicMaterial( { map : new THREE.TextureLoader().load("textures/map.jpg"), side : THREE.DoubleSide } ), // LEFT SIDE
  //   new THREE.MeshBasicMaterial( { map : new THREE.TextureLoader().load("textures/dog.jpg"), side : THREE.DoubleSide } ), // TOP SIDE
  //   new THREE.MeshBasicMaterial( { map : new THREE.TextureLoader().load("textures/map.jpg"), side : THREE.DoubleSide } ), // BOTTOM SIDE
  //   new THREE.MeshBasicMaterial( { map : new THREE.TextureLoader().load("textures/dog.jpg"), side : THREE.DoubleSide } ), // FRONT SIDE
  //   new THREE.MeshBasicMaterial( { map : new THREE.TextureLoader().load("textures/map.jpg"), side : THREE.DoubleSide } ), // BACK SIDE
  // ];

  //case 5
  const geometry = new THREE.BoxGeometry(1, 1, 1); //깊이,높이,폭
  const cubeMaterials = [
    new THREE.MeshLambertMaterial({ color: 0xff0000, side: THREE.DoubleSide }), // RIGHT SIDE
    new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load("textures/map.jpg"), side: THREE.DoubleSide }), // LEFT SIDE
    new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load("textures/dog.jpg"), side: THREE.DoubleSide }), // TOP SIDE
    new THREE.MeshPhongMaterial({ map: new THREE.TextureLoader().load("textures/map.jpg"), side: THREE.DoubleSide }), // BOTTOM SIDE
    new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load("textures/dog.jpg"), side: THREE.DoubleSide }), // FRONT SIDE
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load("textures/map.jpg"), side: THREE.DoubleSide }), // BACK SIDE
  ];

  // MeshBasicMaterial 는 조명에 영향을 받지 않는 재질이다!
  // MeshLambertMaterial , MeshPhongMaterial 는 빛이 없으면 안보인다.

  const material = new THREE.MeshFaceMaterial(cubeMaterials);
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  camera.position.z = 20;

  // AmbientLight 사방에서 주는 빛
  // const ambientLight = new THREE.AmbientLight( 0xFFFFFF , 2.0 ) ; // 1을 기준으로 1이하면 어둡게 1이상이면 밝게
  // scene.add( ambientLight ) ;

  // PointLight params
  // color , intensity  , distance  , decay
  // const light1 = new THREE.PointLight( 0xFFFFFF , 10 , 2000 );
  // light1.position.set( 50, 50, 50 );
  // scene.add( light1 ) ;

  // const light2 = new THREE.PointLight( 0xFF33FF , 4 , 50 );
  // scene.add( light2 ) ;

  // const light3 = new THREE.PointLight( 0xFF3322 , 4 , 50 );
  // scene.add( light3 ) ;

  // DirectionalLight
  // const directionalLight = new THREE.DirectionalLight ( 0xFFFFFF , 1);
  // directionalLight.position.set(5,15,200);
  // scene.add( directionalLight ) ;

  const spotLight = new THREE.SpotLight(0xff45f6, 25);
  spotLight.position.set(60, 60, 60);
  scene.add(spotLight);
}

function update() {
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
}

function render() {
  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  update();
  render();
}
init();
animate();

window.addEventListener(
  "resize",
  () => {
    // 비율 유지를 위해
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  },
  false
);
