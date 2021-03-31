let scene, camera, renderer, cube;
function init() {
  scene = new THREE.Scene();
  // PerspectiveCamera param
  // 카메라 수직시야 , 카메라 절두체 종횡비 , 평면 근처의 카메라 절두체 , 평면 먼 카메라 절두체
  // 뭔말이지!?

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);


  const controls = new THREE.OrbitControls(camera , renderer.domElement);

  // case 1
  const geometry = new THREE.BoxGeometry(1, 1, 1); //깊이,높이,폭
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false });
  cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  // var pointLight = new THREE.PointLight(0x000000);
  // pointLight.position.z = 5;
  // pointLight.position.x = 100;
  // pointLight.position.y = 100;
  // scene.add(pointLight);
  camera.position.z = 5;

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
}

function update() {
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
}

function render(){
  renderer.render(scene, camera);  
}

function animate() {
  requestAnimationFrame(animate);
  update();
  render();
}
init();
animate();

window.addEventListener("resize", () =>{
  // 비율 유지를 위해
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}, false);