 // Three.js scene setup
 const scene = new THREE.Scene();
 const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
 const renderer = new THREE.WebGLRenderer();
 renderer.setSize(window.innerWidth, window.innerHeight);
 document.getElementById('scene-container').appendChild(renderer.domElement);

 // Create a starfield background
 const starsGeometry = new THREE.BufferGeometry();
 const starsMaterial = new THREE.PointsMaterial({color: 0xFFFFFF});

 const starsVertices = [];
 for (let i = 0; i < 10000; i++) {
     const x = (Math.random() - 0.5) * 2000;
     const y = (Math.random() - 0.5) * 2000;
     const z = -Math.random() * 2000;
     starsVertices.push(x, y, z);
 }

 starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
 const starField = new THREE.Points(starsGeometry, starsMaterial);
 scene.add(starField);

 // Create floating 3D objects for skills
 const skillObjects = {};
 const skillCards = document.querySelectorAll('[data-skill]');
 skillCards.forEach((card, index) => {
     const skill = card.dataset.skill;
     const geometry = new THREE.IcosahedronGeometry(0.5, 0);
     const material = new THREE.MeshPhongMaterial({
         color: Math.random() * 0xffffff,
         shininess: 100,
         transparent: true,
         opacity: 0.8
     });
     const mesh = new THREE.Mesh(geometry, material);
     mesh.position.set(
         (Math.random() - 0.5) * 10,
         (Math.random() - 0.5) * 10,
         -10 - Math.random() * 10
     );
     scene.add(mesh);
     skillObjects[skill] = mesh;

     // Add event listener for hover effect
     card.addEventListener('mouseenter', () => {
         mesh.scale.set(1.5, 1.5, 1.5);
     });
     card.addEventListener('mouseleave', () => {
         mesh.scale.set(1, 1, 1);
     });
 });

 // Add lighting
 const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
 scene.add(ambientLight);

 const pointLight = new THREE.PointLight(0xffffff, 1);
 pointLight.position.set(5, 5, 5);
 scene.add(pointLight);

 camera.position.z = 5;

 // Animation loop
 function animate() {
     requestAnimationFrame(animate);

     // Rotate skill objects
     Object.values(skillObjects).forEach(obj => {
         obj.rotation.x += 0.01;
         obj.rotation.y += 0.01;
     });

     // Rotate starfield
     starField.rotation.y += 0.0002;

     renderer.render(scene, camera);
 }

 animate();

 // Resize handler
 window.addEventListener('resize', () => {
     camera.aspect = window.innerWidth / window.innerHeight;
     camera.updateProjectionMatrix();
     renderer.setSize(window.innerWidth, window.innerHeight);
 });

 // Smooth scrolling
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function (e) {
         e.preventDefault();
         document.querySelector(this.getAttribute('href')).scrollIntoView({
             behavior: 'smooth'
         });
     });
 });